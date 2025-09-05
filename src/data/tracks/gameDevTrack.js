// gameDevTrack.js - Detailed Game Development Track Data

export const gameDevTrack = {
  id: 'game-dev',
  title: 'Game Development',
  description: 'Master modern game development using Godot and Unity engines to create 2D and 3D games with multiplayer capabilities.',
  color: 'purple',
  icon: '🎮',
  totalWeeks: 5,
  
  vision: `The vision of this roadmap is to guide beginners through game development using two popular engines: Godot (a free, open-source 2D/3D engine) and Unity (a cross-platform engine known for being beginner-friendly). In 5 weeks, students will start by building simple games in Godot (a 2D platformer and a basic 3D shooter) and then switch to Unity for an advanced 2D multiplayer project. Each level builds on the previous one, giving practical experience in game mechanics, scripting, and deployment.`,
  
  whatYouWillGain: [
    'Core game dev skills: Understanding of game loops, physics, input handling, and asset management',
    'Hands-on projects: Experience making a 2D platformer and a 3D shooter in Godot, then a multiplayer 2D game in Unity',
    'Engine proficiency: Ability to use Godot (free, open-source for 2D/3D games) and Unity (supports both 2D and 3D games)',
    'Multiplayer fundamentals: Learn networking concepts (Unity has built-in support for multiplayer games)',
    'Portfolio-ready project: A completed final game to showcase on GitHub or personal sites'
  ],
  
  whoCanSkipWhat: [
    {
      level: 'Level 1',
      condition: 'if you already know Godot and Unity basics',
      canSkip: true,
      note: 'You can start at Level 2'
    },
    {
      level: 'Level 2',
      condition: 'if you are Unity developers and know Audio, VFX basics',
      canSkip: true,
      note: 'Directly focus on the final multiplayer project (Level 3)'
    },
    {
      level: 'Level 3',
      condition: 'for Game Dev veterans',
      canSkip: false,
      note: 'Use this as structured practice; skip sections you\'re fluent in and take on the final project for challenge'
    }
  ],
  
  levels: [
    {
      level: 1,
      title: 'Beginner',
      goal: 'Learn game development fundamentals with Godot by building simple games. Godot is a free, open-source engine ideal for both 2D and 3D games.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Install Godot Engine',
          url: 'https://godotengine.org/download/windows/',
          description: 'Download the latest stable version - it\'s free and open-source'
        },
        {
          step: 2,
          title: 'Code Editor (Optional)',
          description: 'Install Visual Studio Code for editing scripts'
        },
        {
          step: 3,
          title: 'Version Control (Optional)',
          description: 'Set up Git/GitHub to track your project code'
        }
      ],
      
      weeks: [
        {
          week: 1,
          topics: [
            'Godot Basics: editor interface, scene/node system, GDScript',
            '2D workflow: sprites, tilemaps, collision detection',
            'Player movement and jumping mechanics',
            'Camera follow and basic game physics'
          ],
          resources: [
            {
              type: 'documentation',
              title: 'Godot Official Documentation',
              url: 'https://docs.godotengine.org',
              description: 'Official tutorials including "Your first 2D game"'
            },
            {
              type: 'video',
              title: '2D Platformer Tutorial',
              url: 'https://youtu.be/LOhfqjmasi0?si=QC9kGyb4X4vyEnIt',
              description: 'Brackeys 2D platformer tutorial'
            },
            {
              type: 'video',
              title: 'GDScript Tutorial',
              url: 'https://youtu.be/e1zJS31tr88?si=NrcHB45nRFGgk5Ki',
              description: 'Learn GDScript fundamentals'
            }
          ],
          project: {
            title: '2D Platformer Game',
            description: 'Create a simple 2D platformer game with player movement, jumping mechanics, platforms, and basic physics. Implement camera follow system and add collectibles or simple enemies for gameplay depth.',
            complexity: 'Beginner',
            skillsLearned: ['Godot editor usage', '2D physics and collision', 'Player controls', 'Scene management'],
            keyFeatures: [
              'Player with movement and jumping mechanics',
              'Platforms and gravity system',
              'Level layout using Godot\'s tilemap tools',
              'Camera follow system',
              'Collectibles or simple enemies',
              'Basic game loop and win/lose conditions'
            ],
            resources: [
              {
                type: 'video',
                title: '2D Platformer Complete Guide',
                url: 'https://youtu.be/LOhfqjmasi0?si=QC9kGyb4X4vyEnIt'
              }
            ]
          }
        },
        {
          week: 2,
          topics: [
            '3D Basics: 3D nodes, camera control, physics bodies',
            '3D environment creation: planes, walls, basic modeling',
            'Shooting mechanics: projectiles and raycast systems',
            'Simple AI and particle effects'
          ],
          resources: [
            {
              type: 'video',
              title: 'Godot 3D Development',
              url: 'https://youtube.com/playlist?list=PLrT2fbyJrAIctd7zNUsdPakIllX2lhrzo&si=ioSq-3lKKygt4_H5',
              description: 'Godot University 3D playlist'
            },
            {
              type: 'documentation',
              title: 'Godot 3D Tutorial',
              url: 'https://docs.godotengine.org/en/stable/getting_started/first_3d_game/index.html',
              description: 'Official 3D game tutorial'
            }
          ],
          project: {
            title: '3D Shooter Game',
            description: 'Build a basic 3D shooter game with player movement, shooting mechanics, and targets. Create a simple 3D environment and implement projectile or raycast-based shooting. Add simple AI for moving targets and particle effects for visual polish.',
            complexity: 'Beginner-Intermediate',
            skillsLearned: ['3D game development', 'Shooting mechanics', 'Simple AI', 'Particle systems'],
            keyFeatures: [
              'Player controller in 3D space (KinematicBody)',
              'Basic shooting mechanics (projectiles or raycast)',
              'Simple 3D environment (plane, walls, obstacles)',
              'Targets or obstacles to shoot',
              'Simple AI (moving targets)',
              'Particle effects for shooting and impacts'
            ],
            resources: [
              {
                type: 'video',
                title: '3D Shooter Tutorial',
                url: 'https://youtube.com/playlist?list=PLrT2fbyJrAIctd7zNUsdPakIllX2lhrzo&si=ioSq-3lKKygt4_H5'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Using the Godot editor: scenes, nodes, signals',
        '2D game concepts: sprites, animations, physics (gravity, collision)',
        '3D game basics: spatial nodes, camera control, basic shooter mechanics',
        'Coding in GDScript for gameplay logic',
        'Level design and asset organization',
        'Game physics and collision detection',
        'Basic AI implementation',
        'Particle systems and visual effects'
      ]
    },
    
    {
      level: 2,
      title: 'Intermediate',
      goal: 'Master Unity\'s 2D game development tools. Unity supports creating both 2D and 3D games and is widely used across platforms. Students will learn the Unity Editor and build a more complex 2D game.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Install Unity',
          url: 'https://www.youtube.com/watch?v=DDPd2UKnoaU',
          description: 'Use Unity Hub to install the latest LTS version. Choose 2D or URP 2D template'
        },
        {
          step: 2,
          title: 'Editor Tools',
          description: 'Install Visual Studio (with Unity workload) or VS Code for C# scripting'
        },
        {
          step: 3,
          title: 'Packages (Optional)',
          description: 'For future multiplayer, install networking package like Mirror or Unity Netcode'
        },
        {
          step: 4,
          title: 'Version Control',
          url: 'https://www.youtube.com/watch?v=qpXxcvS-g3g',
          description: 'Connect Unity project to Git/GitHub and learn basic Git operations'
        }
      ],
      
      weeks: [
        {
          week: 3,
          topics: [
            'Unity Editor & C#: GameObjects, Components, Prefabs',
            '2D game development: sprites, animations, Rigidbody2D',
            'Asset management and animation systems',
            'Enemy AI and obstacle interaction'
          ],
          resources: [
            {
              type: 'video',
              title: 'Unity 2D Beginner Complete Course',
              url: 'https://www.youtube.com/watch?v=nGKd4yTP3M8',
              description: 'Code Monkey\'s comprehensive 2D Unity course'
            },
            {
              type: 'video',
              title: 'C# Basics for Unity',
              url: 'https://www.youtube.com/playlist?list=PL0eyrZgxdwhwQZ9zPUC7TnJ-S0KxqGlrN',
              description: 'Unity for Beginners by Dani Krossing'
            },
            {
              type: 'video',
              title: '2D Animations in Unity',
              url: 'https://www.youtube.com/@inScopeStudios/playlists',
              description: 'InScope Studios animation tutorials'
            }
          ],
          project: {
            title: 'Pokémon Clone',
            description: 'Create a comprehensive 2D game (side-scroller or top-down shooter) using Unity. Implement player movement with Rigidbody2D, create animated sprites, and add interactive enemies or obstacles with basic AI patterns.',
            complexity: 'Intermediate',
            skillsLearned: ['Unity Editor proficiency', 'C# scripting', '2D physics', 'Animation systems'],
            keyFeatures: [
              'Player sprite with smooth movement via Rigidbody2D or CharacterController',
              'Animated player and enemy sprites using Unity Animator',
              'Interactive enemies with patrol or bounce behaviors',
              'Level design with tilemaps or prefabs',
              'Collision detection and response systems',
              'Basic game mechanics (health, score, power-ups)'
            ],
            resources: [
              {
                type: 'video',
                title: 'Unity 2D Game Development',
                url: 'https://www.youtube.com/watch?v=nGKd4yTP3M8'
              },
              {
                type: 'channel',
                title: 'Code Monkey Unity Tutorials',
                url: 'https://www.youtube.com/@CodeMonkeyUnity'
              },
              {
                type: 'channel',
                title: 'Brackeys Unity Tutorials',
                url: 'https://www.youtube.com/@Brackeys'
              }
            ]
          }
        },
        {
          week: 4,
          topics: [
            'Game polish: UI elements, sound effects, music integration',
            'Particle systems for visual effects',
            'Networking preparation: Unity multiplayer concepts',
            'Game deployment and build optimization'
          ],
          resources: [
            {
              type: 'video',
              title: 'Unity UI System',
              url: 'https://www.youtube.com/playlist?list=PLg0yr4zozmZVdk8ydXr1hMIqCGWklwRYw',
              description: 'Complete UI implementation guide'
            },
            {
              type: 'video',
              title: 'Audio in Unity',
              url: 'https://www.youtube.com/watch?v=6OT43pvUyfY',
              description: 'Sound effects and music integration'
            },
            {
              type: 'video',
              title: 'VFX in Unity',
              url: 'https://www.youtube.com/playlist?list=PLpPd_BKEUoYhN8CiOoNLTSVh-7U5yjg3n',
              description: 'Particle systems and visual effects'
            },
            {
              type: 'video',
              title: 'Intro to Multiplayer in Unity',
              url: 'https://www.youtube.com/watch?v=stJ4SESQwJQ',
              description: 'Basic multiplayer concepts preparation'
            }
          ],
          project: {
            title: 'Polished 2D Game with UI and Effects',
            description: 'Enhance your 2D game prototype with professional polish including UI elements, sound effects, particle systems, and prepare for multiplayer implementation. Deploy the game and create a demo build.',
            complexity: 'Intermediate',
            skillsLearned: ['UI design', 'Audio integration', 'Particle systems', 'Game deployment'],
            keyFeatures: [
              'Complete UI system (score display, health bar, menus)',
              'Sound effects and background music integration',
              'Particle systems for effects (explosions, pickups, impacts)',
              'Game polish and visual enhancements',
              'Build deployment for testing (WebGL or PC)',
              'Preparation for multiplayer networking concepts'
            ],
            resources: [
              {
                type: 'video',
                title: 'Game Polish Tutorial',
                url: 'https://www.youtube.com/playlist?list=PLg0yr4zozmZVdk8ydXr1hMIqCGWklwRYw'
              },
              {
                type: 'platform',
                title: 'Itch.io Deployment',
                url: 'https://itch.io',
                description: 'Platform for deploying and sharing indie games'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Using the Godot editor: scenes, nodes, signals',
        '2D game concepts: sprites, animations, physics (gravity, collision)',
        '3D game basics: spatial nodes, camera control, basic shooter mechanics',
        'Coding in GDScript for gameplay logic',
        'Level design and asset organization',
        'Unity Editor proficiency: creating and organizing GameObjects, using Animator and UI Canvas',
        'C# scripting for game logic (movement, collision, scoring)',
        'Using Unity\'s 2D physics (RigidBody2D, Collider2D)',
        'Basic game polish: UI, audio, particle effects',
        'Foundational understanding of Unity\'s networking capabilities'
      ]
    },
    
    {
      level: 3,
      title: 'Advanced',
      goal: 'Build and finalize a complete multiplayer 2D game using Unity. Unity has built-in networking support and mature third-party libraries, enabling creation of multiplayer experiences.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Networking Setup',
          url: 'https://www.youtube.com/watch?v=3yuBOB3VrCk',
          description: 'Install networking library (Mirror or Unity Netcode for GameObjects)'
        },
        {
          step: 2,
          title: 'Services & Accounts (If needed)',
          description: 'Create accounts for required services (Photon Cloud, PlayFab)'
        },
        {
          step: 3,
          title: 'Testing Environment',
          description: 'Set up multiple build targets or use Unity Editor and standalone build to simulate two players'
        }
      ],
      
      topicsToLearn: [
        'Multiplayer networking fundamentals',
        'Client-server architecture in games',
        'Network synchronization and authority',
        'Unity\'s networking systems (Netcode/Mirror)',
        'Multiplayer game design patterns',
        'Debugging network latency and sync issues',
        'Game deployment for multiplayer',
        'Advanced C# programming for games'
      ],
      
      resources: [
        {
          type: 'video',
          title: 'Multiplayer Support in Unity',
          url: 'https://www.youtube.com/watch?v=7glCsF9fv3s',
          description: 'Code Monkey\'s multiplayer implementation guide'
        },
        {
          type: 'video',
          title: 'Unity NetCode Playlist',
          url: 'https://youtube.com/playlist?list=PLQMQNmwN3FvyyeI1-bDcBPmZiSaDMbFTi&si=NkfiZkAI-jMb1eLQ',
          description: 'Dilmer Valecillos NetCode tutorials'
        },
        {
          type: 'video',
          title: 'Mirror Library for Unity',
          url: 'https://youtube.com/playlist?list=PLS6sInD7ThM1aUDj8lZrF4b4lpvejB2uB&si=0uPlYZXkqDktVU6Y',
          description: 'Alternative to NetCode using Mirror library'
        }
      ],
      
      weeks: [
        {
          week: 5,
          project: {
            title: 'Multiplayer 2D Game (Optional)',
            subtitle: 'Complete Networked Game Experience',
            description: 'Design and implement a fully functional 2D multiplayer game using Unity\'s networking capabilities. This capstone project demonstrates mastery of game development, networking, and deployment skills through a complete multiplayer experience.',
            complexity: 'Advanced',
            skillsLearned: ['Multiplayer Programming', 'Advanced Unity', 'Collaboration Tools', 'Problem-Solving'],
            keyFeatures: [
              'Complete multiplayer game (co-op platformer or competitive arena shooter)',
              'Network manager and synchronized player prefabs',
              'Real-time player movement and interaction synchronization',
              'Multiplayer game mechanics (shared score, health sync, spawn/despawn)',
              'Lobby system or game menu with network status',
              'Chat system for player communication',
              'Multiple player support with proper authority handling',
              'Final polish: graphics, sound, and user experience'
            ],
            gameDesignOptions: [
              'Simple co-op platformer with shared objectives',
              'Competitive arena shooter with scoring system',
              'Top-down multiplayer adventure game',
              'Real-time strategy game with resource management'
            ],
            technicalRequirements: [
              'Client-server model implementation',
              'Network synchronization for all game objects',
              'Authority transfer and conflict resolution',
              'Latency handling and prediction',
              'Secure multiplayer architecture',
              'Cross-platform compatibility testing'
            ],
            deliverables: [
              'Fully playable multiplayer game',
              'Complete source code with documentation',
              'Multiplayer demo video showing 2+ players',
              'Technical architecture documentation',
              'Deployment package for distribution'
            ],
            resources: [
              {
                type: 'video',
                title: 'Unity Multiplayer Complete Guide',
                url: 'https://www.youtube.com/watch?v=7glCsF9fv3s'
              },
              {
                type: 'video',
                title: 'NetCode Implementation',
                url: 'https://youtube.com/playlist?list=PLQMQNmwN3FvyyeI1-bDcBPmZiSaDMbFTi&si=NkfiZkAI-jMb1eLQ'
              },
              {
                type: 'video',
                title: 'Mirror Networking Alternative',
                url: 'https://youtube.com/playlist?list=PLS6sInD7ThM1aUDj8lZrF4b4lpvejB2uB&si=0uPlYZXkqDktVU6Y'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Multiplayer Programming: Setting up client-server model, network synchronization, authority transfer',
        'Advanced Unity: Complete game pipeline with networking, UI for multiplayer, build/deploy',
        'Collaboration Tools: Using Git for larger codebase, team collaboration',
        'Problem-Solving: Debugging network latency and synchronization issues',
        'Game Architecture: Designing scalable multiplayer game systems',
        'Performance Optimization: Managing network traffic and game performance',
        'Testing Strategies: Multiplayer testing and debugging techniques',
        'Deployment: Publishing games to various platforms'
      ]
    }
  ],
  
  engineOptions: [
    {
      name: 'Godot',
      description: 'Free, open-source engine ideal for 2D and 3D indie games',
      language: 'GDScript (Python-like)',
      strengths: ['Completely free', 'Lightweight', 'Great for 2D', 'Open source'],
      bestFor: 'Indie developers, 2D games, learning game development'
    },
    {
      name: 'Unity',
      description: 'Industry-standard engine for cross-platform game development',
      language: 'C#',
      strengths: ['Large community', 'Asset store', 'Multiplayer support', 'Cross-platform'],
      bestFor: 'Professional development, 3D games, multiplayer games'
    }
  ],
  
  outcome: {
    projects: [
      '2D Platformer Game (Week 1)',
      '3D Shooter Game (Week 2)',
      'Advanced 2D Game Prototype (Week 3)',
      'Final Major Project - Polished 2D Game with UI and Effects (Week 4)',
    ],
    submissionRequirements: {
      mandatory: ['GitHub Repository link', 'Demonstration video'],
      preferred: ['Playable game build', 'Game design document'],
      minimumProjects: 2,
      linkedinPost: {
        required: true,
        shouldInclude: [
          'Demo video showcasing your game',
          'Skills gained and engines used',
          'Hashtags: #DevSource #DevCamp #GameDevelopment',
          'Tag DevSource & Mentors in your post',
          'Additional hashtags: #Acm #Usict #IndieGame #Unity #Godot'
        ]
      }
    },
    certification: {
      title: 'DevSource E-Certificate of Participation - Game Development',
      requirements: ['Complete at least 2 projects for successful completion', 'Submit working game builds with demo videos']
    },
    skills: [
      'Game design and mechanics implementation',
      'Multiple game engine proficiency (Godot & Unity)',
      '2D and 3D game development concepts',
      'Multiplayer networking and synchronization',
      'Game physics and collision systems',
      'Audio and visual effects integration',
      'Game testing and debugging',
      'Game deployment and distribution'
    ]
  }
};

export default gameDevTrack;