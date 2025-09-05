// Devcamp.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  PlayIcon,
  BookOpenIcon,
  LinkIcon,
  DocumentTextIcon,
  StarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import { apiService } from "../../lib/api";
import { LoadingSpinner } from "../UI/LoadingSpinner";

// Import track data (ensure these export objects matching TrackDetails)
import webDevTrack from "../../data/tracks/webDevTrack";
import aiMlTrack from "../../data/tracks/aiMlTrack";
import mobileAppDevTrack from "../../data/tracks/mobileAppDevTrack";
import gameDevTrack from "../../data/tracks/gameDevTrack";

// ---------- Configuration ----------
const SHOW_TASKS = true; // Change this to true to enable tasks

// ---------- Tykl;pes ----------
type ResourceType = "video" | "pdf" | "link";

interface ResourceLink {
  type?: ResourceType;
  title?: string;
  url?: string;
  description?: string;
}

interface ProjectBlock {
  title?: string;
  description?: string;
  coreFeatures?: string[];
  resources?: ResourceLink[];
}

interface WeekBlock {
  week?: number;
  topics?: string[];
  resources?: ResourceLink[];
  project?: ProjectBlock;
}

interface SetupOption {
  name?: string;
  url?: string;
}

interface SetupAccount {
  name?: string;
  url?: string;
  note?: string;
}

interface SetupStep {
  step?: number;
  title?: string;
  url?: string;
  options?: SetupOption[];
  accounts?: SetupAccount[];
}

interface LevelBlock {
  level?: number;
  title?: string;
  goal?: string;
  setupGuide?: SetupStep[];
  weeks?: WeekBlock[];
  skillsGained?: string[];
}

interface SubmissionReqs {
  mandatory?: string[];
  preferred?: string[];
  linkedinPost?: {
    required?: boolean;
    shouldInclude?: string[];
  };
}

interface Outcome {
  projects?: string[];
  submissionRequirements?: SubmissionReqs;
  certification?: {
    title?: string;
    requirements?: string[];
  };
}

interface TrackDetails {
  title?: string;
  vision?: string;
  levels?: LevelBlock[];
  whatYouWillGain?: string[];
  whoCanSkipWhat?: Array<{
    level?: string | number;
    condition?: string;
    canSkip?: boolean;
    note?: string;
  }>;
  outcome?: Outcome;
  totalWeeks?: number;
}

interface TrackMeta {
  id: "web-dev" | "ai-ml" | "game-dev" | "app-dev";
  title: string;
  description: string;
  color: "blue" | "green" | "red" | "purple";
  icon: string; // emoji for now
  totalWeeks: number;
}

type ActiveTab = "overview" | "curriculum" | "projects";

type CodingTrackProfileValue = "webdev" | "app" | "ai" | "game" | "dsa" | undefined;

// ---------- Helpers ----------
const isArr = <T,>(v: unknown): v is T[] => Array.isArray(v);
const nonEmptyStr = (v: unknown): string =>
  typeof v === "string" && v.trim().length > 0 ? v : "";

const colorMap: Record<
  TrackMeta["color"],
  { bg: string; text: string; border: string; hover: string }
> = {
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
    hover: "hover:bg-green-50 dark:hover:bg-green-900/20",
  },
  red: {
    bg: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
    hover: "hover:bg-red-50 dark:hover:bg-red-900/20",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
    hover: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
  },
};

const getTrackColorClasses = (
  color: TrackMeta["color"],
  variant: keyof (typeof colorMap)["blue"]
) => colorMap[color][variant];

const getResourceIcon = (type?: ResourceType) => {
  switch (type) {
    case "video":
      return <PlayIcon className="w-4 h-4" />;
    case "pdf":
      return <DocumentTextIcon className="w-4 h-4" />;
    default:
      return <LinkIcon className="w-4 h-4" />;
  }
};

const tracks: TrackMeta[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Master modern web technologies including React, Node.js, and full-stack development.",
    color: "blue",
    icon: "🌐",
    totalWeeks: 5,
  },
  {
    id: "ai-ml",
    title: "AI/ML",
    description:
      "Dive into artificial intelligence and machine learning with Python, TensorFlow, and more.",
    color: "green",
    icon: "🤖",
    totalWeeks: 5,
  },
  {
    id: "game-dev",
    title: "Game Development",
    description: "Learn game design, development, and deployment using Godot.",
    color: "red",
    icon: "🎮",
    totalWeeks: 5,
  },
  {
    id: "app-dev",
    title: "App Development",
    description:
      "Build mobile applications using React Native, Flutter, and native development.",
    color: "purple",
    icon: "📱",
    totalWeeks: 5,
  },
];

// Map string id → module (typed)
const trackModules: Record<TrackMeta["id"], TrackDetails> = {
  "web-dev": webDevTrack as TrackDetails,
  "ai-ml": aiMlTrack as TrackDetails,
  "app-dev": mobileAppDevTrack as TrackDetails,
  "game-dev": gameDevTrack as TrackDetails,
};

export function Devcamp() {
  const { user, profile } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<TrackMeta["id"] | null>(
    null
  );
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(
    () => new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("curriculum");
  const [previewTrack, setPreviewTrack] = useState<TrackMeta["id"] | null>(
    null
  ); // For preview mode

  useEffect(() => {
    (async () => {
      try {
        const resp = await apiService.getProfile();
        if (resp?.success && resp.data) {
          setUserProfile(resp.data);
          const userTrack: CodingTrackProfileValue =
            resp.data?.profile?.coding_track;

          // normalize to component id
          let mapped: TrackMeta["id"] | null = null;
          if (userTrack === "webdev") mapped = "web-dev";
          if (userTrack === "app") mapped = "app-dev";
          if (userTrack === "ai") mapped = "ai-ml";
          if (userTrack === "game") mapped = "game-dev";
          // historical "dsa" case → pick a sensible default
          if (userTrack === "dsa") mapped = "web-dev";

          if (mapped) setSelectedTrack(mapped);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Error loading user profile:", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const hasSelectedTrack = SHOW_TASKS 
    ? !!selectedTrack && !!userProfile?.profile?.coding_track
    : !!previewTrack;

  const currentTrackId = SHOW_TASKS ? selectedTrack : previewTrack;
  
  // Get track meta for the current track (either selected or preview)
  const trackMeta = useMemo(
    () => tracks.find((t) => t.id === currentTrackId) ?? null,
    [currentTrackId]
  );

  const rawTrackDetails: TrackDetails | null = useMemo(() => {
    if (!currentTrackId) return null;
    return trackModules[currentTrackId] ?? null;
  }, [currentTrackId]);

  const trackDetails: TrackDetails | null = useMemo(() => {
    if (!rawTrackDetails && !trackMeta) return null;
    const td = rawTrackDetails ?? {};
    const outcome = td.outcome ?? {};
    const cert = outcome.certification ?? {};
    const subs = outcome.submissionRequirements ?? {};

    return {
      ...td,
      title: nonEmptyStr(td.title) || trackMeta?.title || "",
      vision: nonEmptyStr(td.vision) || trackMeta?.description || "",
      levels: isArr<LevelBlock>(td.levels) ? td.levels : [],
      whatYouWillGain: isArr<string>(td.whatYouWillGain)
        ? td.whatYouWillGain
        : [],
      whoCanSkipWhat: isArr(td.whoCanSkipWhat) ? td.whoCanSkipWhat : [],
      outcome: {
        projects: isArr<string>(outcome.projects) ? outcome.projects : [],
        submissionRequirements: {
          mandatory: isArr<string>(subs.mandatory) ? subs.mandatory : [],
          preferred: isArr<string>(subs.preferred) ? subs.preferred : [],
          linkedinPost: {
            required: !!subs.linkedinPost?.required,
            shouldInclude: isArr<string>(subs.linkedinPost?.shouldInclude)
              ? subs.linkedinPost?.shouldInclude
              : [],
          },
        },
        certification: {
          title: nonEmptyStr(cert.title),
          requirements: isArr<string>(cert.requirements)
            ? cert.requirements
            : [],
        },
      },
      totalWeeks:
        typeof td.totalWeeks === "number"
          ? td.totalWeeks
          : trackMeta?.totalWeeks ?? 0,
    };
  }, [rawTrackDetails, trackMeta]);

  const toggleLevel = (level?: number) => {
    if (typeof level !== "number") return;
    setExpandedLevels((prev) => {
      const next = new Set(prev);
      next.has(level) ? next.delete(level) : next.add(level);
      return next;
    });
  };

  const handleTrackSelection = async (trackId: TrackMeta["id"]) => {
    // If tasks are disabled, just set preview track without backend call
    if (!SHOW_TASKS) {
      setPreviewTrack(trackId);
      return;
    }

    // Original track selection logic when tasks are enabled
    setIsSelecting(true);
    try {
      // normalize to profile value
      let profileTrackValue: CodingTrackProfileValue | string = trackId;
      if (trackId === "web-dev") profileTrackValue = "webdev";
      if (trackId === "app-dev") profileTrackValue = "app";
      if (trackId === "ai-ml") profileTrackValue = "ai";
      if (trackId === "game-dev") profileTrackValue = "game";

      const updatedProfile = {
        ...userProfile,
        profile: {
          ...userProfile?.profile,
          coding_track: profileTrackValue,
        },
      };

      const resp = await apiService.updateProfile(updatedProfile);
      if (resp?.success) {
        setUserProfile(resp.data);
        setSelectedTrack(trackId);
        setShowSuccess(true);
        
        // Refresh the entire site after successful track change
        setTimeout(() => {
          window.location.reload();
        }, 1500); // Give time to show success message
      }
    } catch (e) {
      console.error("Error saving track selection:", e);
      setIsSelecting(false); // Only reset if there's an error
    }
    // Don't reset isSelecting on success since we're refreshing
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // ---------- Selected track view ----------
  if (hasSelectedTrack && trackMeta) {
    if (!trackDetails) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Track details are being prepared
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Detailed curriculum for {trackMeta.title} is coming soon!
              </p>
              <button
                onClick={() => setSelectedTrack(null)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to Track Selection
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Success Toast - only show when tasks are enabled */}
        {showSuccess && SHOW_TASKS && (
          <div className="fixed top-4 right-4 z-50 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-300 px-6 py-4 rounded-xl shadow-lg flex items-center space-x-2">
            <CheckCircleIcon className="w-5 h-5" />
            <span>Track selection updated successfully!</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => SHOW_TASKS ? setSelectedTrack(null) : setPreviewTrack(null)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group"
            >
              <ArrowLeftIcon className="h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
              <span>Change Track</span>
            </button>

            <div className="flex items-center space-x-8 mr-8">
              {/* Track Info */}
              <div
                className={`flex items-center space-x-3 px-4 py-2 rounded-xl border ${getTrackColorClasses(trackMeta.color, "border")} bg-white dark:bg-gray-800 shadow-sm`}
              >
                <span className="text-2xl" aria-hidden>
                  {trackMeta.icon}
                </span>
                <div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span
                      className={`font-semibold ${getTrackColorClasses(trackMeta.color, "text")}`}
                    >
                      {trackMeta.title} Track
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {trackMeta.totalWeeks} weeks • Active
                  </p>
                </div>
              </div>

              {/* Brand */}
              <div className="flex items-center space-x-2">
                <img
                  src="/devsource.png"
                  alt="DevSource"
                  className="h-20 w-auto opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Content Switch */}
          {!SHOW_TASKS ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center max-w-2xl mx-auto">
                <div className="mb-8">
                  <span className="text-8xl mb-6 block" aria-hidden>
                    🚧
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Tasks Coming Soon!
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    The detailed curriculum and tasks for{" "}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {trackMeta.title}
                    </span>{" "}
                    will be available after
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 mb-8">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      September 5, 2025
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      We&apos;re working hard to create the best learning experience for you!
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {trackDetails.totalWeeks ?? 0}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Weeks</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {trackDetails.levels?.length ?? 0}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Levels</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {trackDetails.outcome?.projects?.length ?? 0}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="text-6xl" aria-hidden>
                    {trackMeta.icon}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                    {trackDetails.title}
                  </h1>
                </div>
                {nonEmptyStr(trackDetails.vision) && (
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
                    {trackDetails.vision}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  {[
                    {
                      label: "Learning Levels",
                      value: trackDetails.levels?.length ?? 0,
                    },
                    {
                      label: "Total Weeks",
                      value: trackDetails.totalWeeks ?? 0,
                    },
                    {
                      label: "Major Projects",
                      value: trackDetails.outcome?.projects?.length ?? 0,
                    },
                    { label: "Certificate", value: 1 },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div
                        className={`text-3xl font-bold mb-1 ${getTrackColorClasses(
                          trackMeta.color,
                          "text"
                        )}`}
                      >
                        {s.value}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex justify-center mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex space-x-1">
                    {[
                      {
                        id: "overview",
                        label: "Overview",
                        icon: <StarIcon className="w-4 h-4" />,
                      },
                      {
                        id: "curriculum",
                        label: "Curriculum",
                        icon: <AcademicCapIcon className="w-4 h-4" />,
                      },
                      {
                        id: "projects",
                        label: "Projects",
                        icon: <BookOpenIcon className="w-4 h-4" />,
                      },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ActiveTab)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                          activeTab === (tab.id as ActiveTab)
                            ? `${getTrackColorClasses(trackMeta.color, "bg")} text-white shadow-md`
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        }`}
                        type="button"
                        aria-current={activeTab === tab.id ? "page" : undefined}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* What You Will Gain */}
                  {isArr<string>(trackDetails.whatYouWillGain) &&
                    trackDetails.whatYouWillGain.length > 0 && (
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${getTrackColorClasses(
                              trackMeta.color,
                              "bg"
                            )} text-white`}
                          >
                            <StarIcon className="w-6 h-6" />
                          </div>
                          <span>What You Will Gain</span>
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {trackDetails.whatYouWillGain.map((gain, i) => (
                            <div key={`${gain}-${i}`} className="flex items-start space-x-3">
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {gain}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Who Can Skip What */}
                  {isArr(trackDetails.whoCanSkipWhat) &&
                    trackDetails.whoCanSkipWhat.length > 0 && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                          Who Can Skip What
                        </h3>
                        <div className="space-y-4">
                          {trackDetails.whoCanSkipWhat.map((skip, i) => (
                            <div
                              key={`${skip.level}-${i}`}
                              className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl"
                            >
                              <div>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                  {skip.level}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">
                                  → {skip.condition}
                                </span>
                                {nonEmptyStr(skip.note) && (
                                  <div className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                                    Note: {skip.note}
                                  </div>
                                )}
                              </div>
                              <div
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  skip.canSkip
                                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                }`}
                              >
                                {skip.canSkip ? "Can Skip" : "Required"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Certification */}
                  {nonEmptyStr(trackDetails.outcome?.certification?.title) && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        {trackDetails.outcome?.certification?.title}
                      </h3>
                      {isArr<string>(
                        trackDetails.outcome?.certification?.requirements
                      ) &&
                        (trackDetails.outcome?.certification?.requirements?.length ??
                          0) > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              Requirements:
                            </h4>
                            <ul className="space-y-2">
                              {trackDetails.outcome?.certification?.requirements?.map(
                                (req, i) => (
                                  <li
                                    key={`${req}-${i}`}
                                    className="flex items-center space-x-3"
                                  >
                                    <CheckCircleIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {req}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="space-y-8">
                  {isArr<LevelBlock>(trackDetails.levels) &&
                    trackDetails.levels.map((level) => {
                      const lvlNum = typeof level.level === "number" ? level.level : undefined;
                      return (
                        <div
                          key={`lvl-${lvlNum ?? "x"}-${level.title ?? ""}`}
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleLevel(lvlNum)}
                            className={`w-full p-6 text-left transition-colors ${getTrackColorClasses(
                              trackMeta.color,
                              "hover"
                            )}`}
                            type="button"
                            aria-expanded={lvlNum ? expandedLevels.has(lvlNum) : false}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div
                                  className={`w-16 h-16 rounded-2xl ${getTrackColorClasses(
                                    trackMeta.color,
                                    "bg"
                                  )} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                                  aria-hidden
                                >
                                  {lvlNum ?? "?"}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    Level {lvlNum ?? "?"}: {level.title ?? ""}
                                  </h3>
                                  {nonEmptyStr(level.goal) && (
                                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                                      {level.goal}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {lvlNum && expandedLevels.has(lvlNum) ? (
                                <ChevronUpIcon className="h-6 w-6 text-gray-400 transition-transform" />
                              ) : (
                                <ChevronDownIcon className="h-6 w-6 text-gray-400 transition-transform" />
                              )}
                            </div>
                          </button>

                          {lvlNum && expandedLevels.has(lvlNum) && (
                            <div className="px-6 pb-6 border-top border-gray-100 dark:border-gray-700">
                              {/* Setup Guide */}
                              {isArr<SetupStep>(level.setupGuide) &&
                                level.setupGuide.length > 0 && (
                                  <div className="mt-6 mb-8">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 dark:text-blue-400 text-sm">
                                          ⚙️
                                        </span>
                                      </div>
                                      <span>Setup Guide</span>
                                    </h4>
                                    <div className="space-y-3">
                                      {level.setupGuide.map((step, si) => (
                                        <div
                                          key={`setup-${step.step ?? si}-${step.title ?? ""}`}
                                          className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                        >
                                          <div
                                            className={`w-6 h-6 rounded-full ${getTrackColorClasses(
                                              trackMeta.color,
                                              "bg"
                                            )} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                                          >
                                            {step.step ?? si + 1}
                                          </div>
                                          <div className="flex-1">
                                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                                              {step.title ?? "Step"}
                                            </span>
                                            {nonEmptyStr(step.url) && (
                                              <a
                                                href={step.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                                              >
                                                (Guide)
                                              </a>
                                            )}

                                            {isArr<SetupOption>(step.options) &&
                                              step.options.length > 0 && (
                                                <div className="mt-2 space-y-1">
                                                  {step.options.map((opt, oi) => (
                                                    <div key={`opt-${oi}`} className="text-sm">
                                                      <a
                                                        href={opt.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                                      >
                                                        • {opt.name ?? "Option"}
                                                      </a>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}

                                            {isArr<SetupAccount>(step.accounts) &&
                                              step.accounts.length > 0 && (
                                                <div className="mt-2 space-y-1">
                                                  {step.accounts.map((acc, ai) => (
                                                    <div key={`acc-${ai}`} className="text-sm">
                                                      <a
                                                        href={acc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                                      >
                                                        • {acc.name ?? "Account"}
                                                      </a>
                                                      {nonEmptyStr(acc.note) && (
                                                        <span className="text-gray-500 dark:text-gray-400 ml-2">
                                                          ({acc.note})
                                                        </span>
                                                      )}
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              {/* Weeks */}
                              {isArr<WeekBlock>(level.weeks) &&
                                level.weeks.map((week) => {
                                  const wk = week.week ?? 0;
                                  const projectTitle = week.project?.title ?? "";
                                  return (
                                    <div key={`wk-${wk}-${projectTitle}`} className="mb-8">
                                      <div className="flex items-center space-x-3 mb-4">
                                        <div
                                          className={`w-10 h-10 rounded-xl ${getTrackColorClasses(
                                            trackMeta.color,
                                            "bg"
                                          )} flex items-center justify-center text-white font-bold shadow-md`}
                                        >
                                          W{wk || "?"}
                                        </div>
                                        <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                          Week {wk || "?"}
                                          {projectTitle ? ` - ${projectTitle}` : ""}
                                        </h5>
                                      </div>

                                      {isArr<string>(week.topics) &&
                                        week.topics.length > 0 && (
                                          <div className="mb-4">
                                            <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                              Topics to Learn:
                                            </h6>
                                            <ul className="space-y-1">
                                              {week.topics.map((topic, ti) => (
                                                <li
                                                  key={`topic-${wk}-${ti}`}
                                                  className="flex items-start space-x-2 text-gray-700 dark:text-gray-300"
                                                >
                                                  <span className="text-blue-500 mt-1.5 w-1.5 h-1.5 bg-current rounded-full flex-shrink-0" />
                                                  <span>{topic}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}

                                      {isArr<ResourceLink>(week.resources) &&
                                        week.resources.length > 0 && (
                                          <div className="mb-4">
                                            <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                              Learning Resources:
                                            </h6>
                                            <div className="grid md:grid-cols-2 gap-3">
                                              {week.resources.map((res, ri) => (
                                                <a
                                                  key={`res-${wk}-${ri}-${res.title ?? "r"}`}
                                                  href={res.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                                                >
                                                  <div
                                                    className={`p-2 rounded-lg ${
                                                      res.type === "video"
                                                        ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                                        : res.type === "pdf"
                                                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                                                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                                    }`}
                                                  >
                                                    {getResourceIcon(res.type)}
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                                      {nonEmptyStr(res.title) || "Resource"}
                                                    </p>
                                                    {nonEmptyStr(res.description) && (
                                                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                        {res.description}
                                                      </p>
                                                    )}
                                                  </div>
                                                </a>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                      {week.project && (
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                                          <h6 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center space-x-2">
                                            <BookOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <span>
                                              Project:{" "}
                                              {nonEmptyStr(week.project.title) || "Untitled Project"}
                                            </span>
                                          </h6>
                                          {nonEmptyStr(week.project.description) && (
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                              {week.project.description}
                                            </p>
                                          )}

                                          {isArr<string>(week.project.coreFeatures) &&
                                            week.project.coreFeatures.length > 0 && (
                                              <div className="mb-4">
                                                <span className="font-semibold text-gray-900 dark:text-gray-100 mb-2 block">
                                                  Core Features:
                                                </span>
                                                <ul className="space-y-1">
                                                  {week.project.coreFeatures.map((f, fi) => (
                                                    <li
                                                      key={`feat-${wk}-${fi}`}
                                                      className="flex items-start space-x-2"
                                                    >
                                                      <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                        {f}
                                                      </span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}

                                          {isArr<ResourceLink>(week.project.resources) &&
                                            week.project.resources.length > 0 && (
                                              <div>
                                                <span className="font-semibold text-gray-900 dark:text-gray-100 mb-2 block">
                                                  Project Resources:
                                                </span>
                                                <div className="grid md:grid-cols-2 gap-2">
                                                  {week.project.resources.map((res, ri) => (
                                                    <a
                                                      key={`pres-${wk}-${ri}-${res.title ?? "pr"}`}
                                                      href={res.url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center space-x-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors text-sm group"
                                                    >
                                                      {getResourceIcon(res.type)}
                                                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {nonEmptyStr(res.title) || "Resource"}
                                                      </span>
                                                    </a>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                              {/* Skills Gained */}
                              {isArr<string>(level.skillsGained) &&
                                level.skillsGained.length > 0 && (
                                  <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                      </div>
                                      <span>Skills You&apos;ll Gain</span>
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                      {level.skillsGained.map((skill, si) => (
                                        <div
                                          key={`skill-${lvlNum}-${si}`}
                                          className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg"
                                        >
                                          <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                                            {skill}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${getTrackColorClasses(
                          trackMeta.color,
                          "bg"
                        )} text-white`}
                      >
                        <BookOpenIcon className="w-6 h-6" />
                      </div>
                      <span>
                        Major Projects ({trackDetails.outcome?.projects?.length ?? 0})
                      </span>
                    </h3>

                    {isArr<string>(trackDetails.outcome?.projects) &&
                    (trackDetails.outcome?.projects?.length ?? 0) > 0 ? (
                      <div className="space-y-6">
                        {trackDetails.outcome!.projects!.map((project, i) => (
                          <div
                            key={`proj-${i}-${project}`}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-10 h-10 rounded-xl ${getTrackColorClasses(
                                  trackMeta.color,
                                  "bg"
                                )} flex items-center justify-center text-white font-bold`}
                              >
                                {i + 1}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {project}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Week {i + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-600 dark:text-gray-400">
                        No projects listed yet.
                      </div>
                    )}
                  </div>

                  {/* Submission Requirements */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                      Submission Requirements
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-red-600 dark:text-red-400">
                          Mandatory Submissions:
                        </h4>
                        <ul className="space-y-2">
                          {isArr<string>(
                            trackDetails.outcome?.submissionRequirements?.mandatory
                          ) &&
                            trackDetails.outcome!.submissionRequirements!.mandatory!.map(
                              (req, i) => (
                                <li key={`mand-${i}`} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {req}
                                  </span>
                                </li>
                              )
                            )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-green-600 dark:text-green-400">
                          Preferred Submissions:
                        </h4>
                        <ul className="space-y-2">
                          {isArr<string>(
                            trackDetails.outcome?.submissionRequirements?.preferred
                          ) &&
                            trackDetails.outcome!.submissionRequirements!.preferred!.map(
                              (req, i) => (
                                <li key={`pref-${i}`} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {req}
                                  </span>
                                </li>
                              )
                            )}
                        </ul>
                      </div>
                    </div>

                    {/* LinkedIn Post Requirements */}
                    {isArr<string>(
                      trackDetails.outcome?.submissionRequirements?.linkedinPost
                        ?.shouldInclude
                    ) &&
                      (trackDetails.outcome?.submissionRequirements?.linkedinPost
                        ?.shouldInclude?.length ?? 0) > 0 && (
                        <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center space-x-2">
                            <span aria-hidden>📱</span>
                            <span>LinkedIn Post Requirements:</span>
                          </h4>
                          <ul className="space-y-2">
                            {trackDetails.outcome!.submissionRequirements!.linkedinPost!.shouldInclude!.map(
                              (req, i) => (
                                <li key={`li-${i}`} className="flex items-center space-x-2">
                                  <CheckCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {req}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ---------- Landing / Selection ----------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="mb-8 relative">
            {/* ACM Logo - Top Left */}
            <div className="absolute top-0 left-12 flex items-center space-x-2">
              <img
                src="/acm.png"
                alt="ACM"
                className="h-20 w-auto opacity-100 hover:opacity-100 transition-opacity dark:filter dark:invert dark:brightness-0 dark:contrast-100"
              />
            </div>

            {/* DevSource Logo - Top Right */}
            <div className="absolute top-0 right-12 flex items-center space-x-2">
              <img
                src="/devsource.png"
                alt="DevSource"
                className="h-20 w-auto opacity-100 hover:opacity-100 transition-opacity dark:filter dark:invert dark:brightness-0 dark:contrast-100"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Dev<span className="text-blue-600 dark:text-blue-400">camp</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {userProfile?.profile?.coding_track
              ? "Welcome back to your coding journey. Continue learning or explore a new path."
              : "Transform your coding skills with our flagship intensive bootcamp. Choose your path and start building your future."}
          </p>

          {!userProfile?.profile?.coding_track && (
            <button
              onClick={() =>
                document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              type="button"
            >
              Choose Your Learning Path
            </button>
          )}
        </div>

        {/* Track Selection */}
        <div id="tracks">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {SHOW_TASKS && userProfile?.profile?.coding_track ? "Switch Your Track" : "Select Your Specialty"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Each track is carefully designed with hands-on projects and industry-relevant skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tracks.map((track) => {
              const userTrack: CodingTrackProfileValue = userProfile?.profile?.coding_track;
              const isCurrentTrack = SHOW_TASKS && (
                (userTrack === "webdev" && track.id === "web-dev") ||
                (userTrack === "app" && track.id === "app-dev") ||
                (userTrack === "ai" && track.id === "ai-ml") ||
                (userTrack === "game" && track.id === "game-dev") ||
                (userTrack === "dsa" && track.id === "web-dev")
              );

              return (
                <div
                  key={track.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden ${
                    isCurrentTrack
                      ? `${getTrackColorClasses(track.color, "border")} shadow-lg`
                      : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 shadow-lg"
                  }`}
                >
                  {/* Current Track Badge - only show when tasks are enabled */}
                  {isCurrentTrack && SHOW_TASKS && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-3 shadow-lg">
                      <CheckCircleIcon className="h-6 w-6" />
                    </div>
                  )}

                  {/* Track Icon & Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl ${getTrackColorClasses(
                        track.color,
                        "bg"
                      )} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      aria-hidden
                    >
                      {track.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {track.totalWeeks} weeks • Intensive
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                    {track.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Hands-on Projects",
                      "Industry Mentorship",
                      "Career Guidance",
                      "Certificate of Completion",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => handleTrackSelection(track.id)}
                    disabled={SHOW_TASKS && isSelecting}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      isCurrentTrack && SHOW_TASKS
                        ? `${getTrackColorClasses(track.color, "bg")} text-white`
                        : "bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600"
                    }`}
                    type="button"
                  >
                    {SHOW_TASKS && isSelecting ? (
                      <span className="inline-flex items-center gap-2">
                        <LoadingSpinner size="small" />
                        Selecting...
                      </span>
                    ) : isCurrentTrack && SHOW_TASKS ? (
                      "Continue Learning"
                    ) : SHOW_TASKS && userProfile?.profile?.coding_track ? (
                      "Switch to This Track"
                    ) : (
                      "Start This Track"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        {!userProfile?.profile?.coding_track && SHOW_TASKS && (
          <div className="text-center mt-16 py-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-3xl border border-blue-100 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their careers through our intensive bootcamp program.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors" type="button">
                Get Started Today
              </button>
              <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-colors" type="button">
                Learn More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}