// mobileAppDevTrack.js - Detailed Mobile App Development Track Data

export const mobileAppDevTrack = {
  id: 'mobile-app-dev',
  title: 'Mobile App Development',
  description: 'Master modern mobile technologies including Flutter, React Native, and Kotlin for building cross-platform and native applications.',
  color: 'green',
  icon: '📱',
  totalWeeks: 4,
  
  vision: `The vision of this roadmap is to provide a clear, beginner-friendly, and self-contained learning path for students who want to start their journey in Mobile App Development. This roadmap is designed in levels so that students can progress at their own pace from absolute beginner to Flutter, Kotlin (Android SDK), React Native stack developer. The ultimate goal is to make students confident enough to build and deploy their own projects without relying on constant external help.`,
  
  whatYouWillGain: [
    'Strong understanding of core mobile technologies (Dart/Kotlin/React Native, Firebase, local storage)',
    'Practical hands-on project experience at every stage',
    'Ability to build, deploy, and present real-world mobile applications',
    'A structured self-learning habit that can be applied to other domains',
    'An E-Certificate of Participation to showcase your skills on LinkedIn, GitHub, and resume'
  ],
  
  whoCanSkipWhat: [
    {
      level: 'Level 1',
      condition: 'if you know basic programming concepts and mobile UI basics',
      canSkip: true
    },
    {
      level: 'Level 2',
      condition: 'if you know a mobile framework + API integration + local storage',
      canSkip: true
    },
    {
      level: 'Level 3',
      condition: 'for advanced real-time features & final project challenge',
      canSkip: false,
      note: 'Still do Level 3'
    }
  ],
  
  levels: [
    {
      level: 1,
      title: 'Beginner',
      goal: 'Learn the foundations of mobile development, choose your framework (Flutter/React Native/Kotlin), and build your first functional mobile app.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Install VS Code',
          url: 'https://youtu.be/DoLYVXR9SSc?si=nli23Y4AoW4ufFlV'
        },
        {
          step: 2,
          title: 'Create Github account and basics of git & github',
          url: 'https://youtu.be/gwWKnnCMQ5c?si=fNGivfqd3Sk9ba_2'
        },
        {
          step: 3,
          title: 'Choose and install mobile development environment',
          options: [
            { 
              name: 'Flutter', 
              url: 'https://youtu.be/mMeQhLGD-og?si=oijb_8ZPdWKuKyqZ',
              description: 'Google\'s cross-platform framework using Dart'
            },
            { 
              name: 'React Native', 
              url: 'https://youtu.be/UwFFsS33xG8?si=nx-As-MCqIMSyYkG',
              description: 'Facebook\'s cross-platform framework using JavaScript'
            },
            { 
              name: 'Kotlin (Android Studio)', 
              url: 'https://developer.android.com/studio',
              description: 'Native Android development with Kotlin'
            }
          ]
        }
      ],
      
      weeks: [
        {
          week: 1,
          topics: [
            'Mobile app fundamentals: UI components, layouts, navigation',
            'State management basics in your chosen framework',
            'Local storage: SQLite, SharedPreferences, or AsyncStorage',
            'Basic styling and theming (light/dark mode)'
          ],
          resources: [
            {
              type: 'video',
              title: 'Flutter Fundamentals',
              url: 'https://youtube.com/playlist?list=PLsUp7t2vRqx90Hm7LmG-ZG51QOK-zvunN&si=yt984LXCA0LHGCR4',
              description: 'Complete Flutter basics and widget fundamentals',
              framework: 'Flutter'
            },
            {
              type: 'video',
              title: 'React Native Fundamentals',
              url: 'https://youtu.be/CfSK9niSAxY?si=2Yz8_LoyUiHxfqo5',
              description: 'React Native components and navigation',
              framework: 'React Native'
            },
            {
              type: 'video',
              title: 'Kotlin Android Development',
              url: 'https://youtube.com/playlist?list=PLzEWSvaHx_Z2MeyGNQeUCEktmnJBp8136&si=1I52VL8UC4am-j3y',
              description: 'Android development with Kotlin basics',
              framework: 'Kotlin'
            }
          ],
          project: {
            title: 'To-Do List App',
            description: 'Build a fully functional to-do list mobile application where users can add, edit, delete, and mark tasks as complete. Implement categories or priorities for tasks and add light/dark mode toggle. Use local storage (SQLite, SharedPreferences, or AsyncStorage) to persist data.',
            complexity: 'Beginner',
            skillsLearned: ['CRUD operations', 'state management', 'persistent storage'],
            keyFeatures: [
              'Users can add, edit, delete, and mark tasks as complete',
              'Use local storage (SQLite or SharedPreferences or AsyncStorage)',
              'Implement categories or priorities for tasks',
              'Add light/dark mode toggle for UI practice'
            ],
            resources: [
              {
                type: 'video',
                title: 'Flutter To-Do App',
                url: 'https://youtube.com/playlist?list=PLsUp7t2vRqx90Hm7LmG-ZG51QOK-zvunN&si=yt984LXCA0LHGCR4',
                framework: 'Flutter'
              },
              {
                type: 'video',
                title: 'React Native To-Do App',
                url: 'https://youtu.be/CfSK9niSAxY?si=2Yz8_LoyUiHxfqo5',
                framework: 'React Native'
              },
              {
                type: 'video',
                title: 'Kotlin To-Do App',
                url: 'https://youtube.com/playlist?list=PLzEWSvaHx_Z2MeyGNQeUCEktmnJBp8136&si=1I52VL8UC4am-j3y',
                framework: 'Kotlin'
              }
            ]
          }
        },
        {
          week: 2,
          topics: [
            'API integration: HTTP requests, JSON parsing',
            'Image handling and caching',
            'List views and infinite scrolling/pagination',
            'Search functionality and filtering'
          ],
          resources: [
            {
              type: 'video',
              title: 'Flutter API Integration',
              url: 'https://youtu.be/wugzPYOJHm8?si=VHc6r5aWgnymJADt',
              description: 'Working with REST APIs in Flutter',
              framework: 'Flutter'
            },
            {
              type: 'video',
              title: 'React Native API Integration',
              url: 'https://youtu.be/KC0ddYQcnq4?si=49Rz67V8neSrRwdT',
              description: 'Fetch API and handling responses',
              framework: 'React Native'
            },
            {
              type: 'video',
              title: 'Kotlin API Integration',
              url: 'https://youtube.com/playlist?list=PLy1MhTvkr6qIjjBxt2Q7VtYgAsopGX8ZA&si=RKE_pr0k5vwrxAIb',
              description: 'Retrofit and API calls in Android',
              framework: 'Kotlin'
            }
          ],
          project: {
            title: 'Movie App (with API Integration)',
            description: 'Create a movie discovery app that fetches data from a public API (TMDB). Display trending movies, implement search functionality, show detailed movie information, and add infinite scroll or pagination. Include a favourites section using local storage.',
            complexity: 'Intermediate',
            skillsLearned: ['REST API calls', 'JSON parsing', 'pagination', 'search'],
            keyFeatures: [
              'Fetch movie data from a public API (e.g., TMDB)',
              'Display trending movies, search by title, and view details',
              'Implement infinite scroll or pagination',
              'Add a favourites section using local storage'
            ],
            resources: [
              {
                type: 'video',
                title: 'Flutter Movie App',
                url: 'https://youtu.be/wugzPYOJHm8?si=VHc6r5aWgnymJADt',
                framework: 'Flutter'
              },
              {
                type: 'video',
                title: 'React Native Movie App',
                url: 'https://youtu.be/KC0ddYQcnq4?si=49Rz67V8neSrRwdT',
                framework: 'React Native'
              },
              {
                type: 'video',
                title: 'Kotlin Movie App',
                url: 'https://youtube.com/playlist?list=PLy1MhTvkr6qIjjBxt2Q7VtYgAsopGX8ZA&si=RKE_pr0k5vwrxAIb',
                framework: 'Kotlin'
              },
              {
                type: 'link',
                title: 'TMDB API',
                url: 'https://developers.themoviedb.org/3'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Mobile UI design principles and responsive layouts',
        'State management in mobile applications',
        'Local data persistence (SQLite, SharedPreferences, AsyncStorage)',
        'Basic navigation between screens',
        'GitHub basics for mobile projects',
        'Building and testing mobile apps',
        'API integration and JSON parsing',
        'List views and data presentation',
        'Search and filtering functionality',
        'Image handling and caching'
      ]
    },
    
    {
      level: 2,
      title: 'Intermediate',
      goal: 'Build more complex applications with advanced features like e-commerce functionality and shopping cart logic.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Set up emulators/simulators',
          description: 'Configure Android emulator and/or iOS simulator for testing'
        },
        {
          step: 2,
          title: 'Learn advanced state management',
          options: [
            { name: 'Flutter - Provider/Riverpod/BLoC', url: 'https://flutter.dev/docs/development/data-and-backend/state-mgmt' },
            { name: 'React Native - Redux/Zustand/Context', url: 'https://redux.js.org/introduction/getting-started' },
            { name: 'Kotlin - MVVM/LiveData/ViewModel', url: 'https://developer.android.com/topic/architecture' }
          ]
        },
        {
          step: 3,
          title: 'Database setup',
          options: [
            { name: 'Firebase', url: 'https://firebase.google.com/docs' },
            { name: 'Supabase', url: 'https://supabase.com/docs' },
            { name: 'SQLite (local)', url: 'https://www.sqlite.org/docs.html' }
          ]
        }
      ],
      
      weeks: [
        {
          week: 3,
          project: {
            title: 'E-Commerce Mobile App',
            description: 'Build a comprehensive e-commerce mobile application with product listings, filtering, sorting, shopping cart functionality, and favourites. Fetch product data from a public API and implement advanced UI/UX patterns.',
            complexity: 'Intermediate-Advanced',
            skillsLearned: ['REST API calls', 'JSON parsing', 'filtering', 'sorting', 'cart logic', 'local storage'],
            keyFeatures: [
              'Fetch product data from a public API (e.g., Fake Store API or DummyJSON)',
              'Display product listings, filter by category, and view details',
              'Implement sorting by price and rating',
              'Add a shopping cart and favourites section using local storage',
              'Product search and advanced filtering',
              'User reviews and ratings display'
            ],
            resources: [
              {
                type: 'video',
                title: 'Flutter E-Commerce App',
                url: 'https://youtu.be/rX9kvw79kgk?si=aAYYotH8d-CiIH29',
                framework: 'Flutter'
              },
              {
                type: 'video',
                title: 'React Native E-Commerce App',
                url: 'https://youtube.com/playlist?list=PLS7HqqjkitavETILUf9PWhfQUzff6N_nC&si=RIWzDBBI2AHAcxrK',
                framework: 'React Native'
              },
              {
                type: 'video',
                title: 'Kotlin E-Commerce App',
                url: 'https://youtu.be/PtBiFPYnUWE?si=h5_H-zQLhCAqBc9Z',
                framework: 'Kotlin'
              },
              {
                type: 'link',
                title: 'Fake Store API',
                url: 'https://fakestoreapi.com/'
              },
              {
                type: 'link',
                title: 'DummyJSON API',
                url: 'https://dummyjson.com/'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Advanced state management patterns',
        'Complex UI layouts and custom components',
        'Shopping cart logic and persistence',
        'Advanced filtering and sorting algorithms',
        'Product catalog architecture',
        'Local storage optimization',
        'Performance optimization for large lists',
        'Custom animations and transitions'
      ]
    },
    
    {
      level: 3,
      title: 'Advanced',
      goal: 'Master real-time communication, authentication, and advanced mobile features to build production-ready applications.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Set up Firebase/Backend services',
          options: [
            { name: 'Firebase', url: 'https://firebase.google.com/docs' },
            { name: 'Supabase', url: 'https://supabase.com/docs' },
            { name: 'AWS Amplify', url: 'https://docs.amplify.aws/' }
          ]
        },
        {
          step: 2,
          title: 'Configure push notifications',
          description: 'Set up FCM (Firebase Cloud Messaging) or equivalent'
        },
        {
          step: 3,
          title: 'Set up real-time database',
          description: 'Configure WebSocket connections or Firebase Realtime Database'
        },
        {
          step: 4,
          title: 'Prepare for app store deployment',
          description: 'Set up developer accounts and understand deployment process'
        }
      ],
      
      topicsToLearn: [
        'Real-time communication with WebSockets or Firebase',
        'User authentication and security best practices',
        'Push notifications implementation',
        'File upload and media sharing',
        'End-to-end encryption concepts',
        'Advanced UI/UX patterns and animations',
        'App performance optimization',
        'Deployment to app stores'
      ],
      
      resources: [
        {
          type: 'video',
          title: 'Firebase Authentication Guide',
          url: 'https://youtu.be/rbuSx1yEgV8?si=abcdef'
        },
        {
          type: 'video',
          title: 'Real-time Database Integration',
          url: 'https://youtu.be/WacqhiI-wuQ?si=abcdef'
        },
        {
          type: 'video',
          title: 'Push Notifications Setup',
          url: 'https://youtu.be/sioEY4tWmLI?si=abcdef'
        }
      ],
      
      weeks: [
        {
          week: 4,
          project: {
            title: 'Final Major Project - Real-Time Chat Application',
            subtitle: 'Advanced Communication Features',
            description: 'Build a production-ready real-time chat application with comprehensive features including media sharing, push notifications, user presence indicators, and end-to-end encryption. This project demonstrates mastery of real-time communication and advanced mobile development concepts.',
            complexity: 'Advanced',
            skillsLearned: ['Real-Time Communication', 'Authentication & Security', 'Scalable Data Architecture', 'Advanced UI/UX Design', 'Push Notifications'],
            keyFeatures: [
              'Real-time messaging with WebSockets or Firebase',
              'User authentication and profile management',
              'Media sharing (Images, Videos, Documents)',
              'Push notifications for new messages',
              'User presence indicators (Online/Offline/Typing)',
              'End-to-End Encryption (E2EE) implementation',
              'Dark mode & comprehensive theme customization',
              'Message search and chat history',
              'Group chat functionality',
              'File sharing with progress indicators'
            ],
            techStackChoices: {
              frontend: ['Flutter', 'React Native', 'Kotlin'],
              backend: ['Firebase', 'Supabase', 'Node.js + Socket.io'],
              realtime: ['Firebase Realtime Database', 'Firebase Firestore', 'Socket.io'],
              storage: ['Firebase Storage', 'AWS S3', 'Supabase Storage'],
              notifications: ['Firebase Cloud Messaging', 'OneSignal']
            },
            resources: [
              {
                type: 'video',
                title: 'Flutter Chat App Complete Series',
                url: 'https://youtube.com/playlist?list=PL8kbUJtS6hyal7Uw7wTeYmv7yiNPH5kOq&si=scrNUoJZecW0PnC4',
                framework: 'Flutter'
              },
              {
                type: 'video',
                title: 'React Native Chat App Series',
                url: 'https://youtube.com/playlist?list=PLswiMBSI75YtSVBBKUYY4dC20hQJ7OdAz&si=65Xf3yBaotxljHfE',
                framework: 'React Native'
              },
              {
                type: 'video',
                title: 'Kotlin Chat App Series',
                url: 'https://youtube.com/playlist?list=PLgpnJydBcnPB-aQ6P5hWCHBjy8LWZ9x4w&si=5T1bmfaxCevqozFi',
                framework: 'Kotlin'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Real-time communication architecture',
        'Advanced authentication and security implementation',
        'Push notification systems',
        'Media handling and file upload optimization',
        'Complex state management in large applications',
        'Performance optimization and memory management',
        'App store deployment process',
        'User experience design for complex applications',
        'Error handling and crash analytics',
        'Testing strategies for mobile applications'
      ]
    }
  ],
  
  outcome: {
    projects: [
      'To-Do List App (Week 1)',
      'Movie Discovery App (Week 2)',
      'E-Commerce Mobile App (Week 3)',
      'Final Major Project - Real-Time Chat Application (Week 4)',
    ],
    submissionRequirements: {
      mandatory: ['GitHub Repository link', 'Demonstration video'],
      preferred: ['APK/IPA file for testing', 'App store screenshots'],
      linkedinPost: {
        required: true,
        shouldInclude: [
          'Short demo video of your mobile app',
          'The skills you gained and technologies used',
          'Hashtags: #DevSource #DevCamp #MobileAppDevelopment',
          'Tag DevSource in your post',
          'Additional hashtags: #Acm #Usict #AppDevelopment'
        ]
      }
    },
    certification: {
      title: 'DevSource E-Certificate of Participation - Mobile App Development',
      requirements: ['Submit at least 2 projects with complete functionality', 'All submissions must include working demo videos']
    },
    frameworkOptions: [
      {
        name: 'Flutter',
        description: 'Google\'s UI toolkit for cross-platform development',
        language: 'Dart',
        platforms: ['Android', 'iOS', 'Web', 'Desktop']
      },
      {
        name: 'React Native',
        description: 'Facebook\'s framework for native mobile apps using React',
        language: 'JavaScript/TypeScript',
        platforms: ['Android', 'iOS']
      },
      {
        name: 'Kotlin',
        description: 'Modern programming language for Android native development',
        language: 'Kotlin',
        platforms: ['Android']
      }
    ]
  }
};

export default mobileAppDevTrack;