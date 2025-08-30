// webDevTrack.js - Detailed Web Development Track Data

export const webDevTrack = {
  id: 'web-dev',
  title: 'Web Development',
  description: 'Master modern web technologies including React, Node.js, and full-stack development.',
  color: 'blue',
  icon: '🌐',
  totalWeeks: 5,
  
  vision: `The vision of this roadmap is to provide a clear, beginner-friendly, and self-contained learning path for students who want to start their journey in Web Development. This roadmap is designed in levels so that students can progress at their own pace from absolute beginner to MERN stack developer. The ultimate goal is to make students confident enough to build and deploy their own projects without relying on constant external help.`,
  
  whatYouWillGain: [
    'Strong understanding of core web technologies (HTML, CSS, JavaScript, React, Node.js, Express, MongoDB)',
    'Practical hands-on project experience at every stage',
    'Ability to build, deploy, and present real-world applications',
    'A structured self-learning habit that can be applied to other domains',
    'An E-Certificate of Participation to showcase your skills on LinkedIn, GitHub, and resume'
  ],
  
  whoCanSkipWhat: [
    {
      level: 'Level 1',
      condition: 'if you know HTML, CSS, JS, and API basics',
      canSkip: true
    },
    {
      level: 'Level 2',
      condition: 'if you know a frontend framework + backend basics + database',
      canSkip: true
    },
    {
      level: 'Level 3',
      condition: 'for advanced Docker & final project challenge',
      canSkip: false,
      note: 'Still do Level 3'
    }
  ],
  
  levels: [
    {
      level: 1,
      title: 'Beginner',
      goal: 'Learn the foundations of web development, JavaScript fundamentals, and API integration, then build your first fully functional beginner project.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Install VS Code',
          url: 'https://youtu.be/DoLYVXR9SSc?si=nli23Y4AoW4ufFlV'
        },
        {
          step: 2,
          title: 'Install Live server extension',
          url: 'https://youtu.be/9kEOkw_LvGU?si=a2L2DqAUpUMTmnU4'
        },
        {
          step: 3,
          title: 'Create Github account and basics of git & github',
          url: 'https://youtu.be/gwWKnnCMQ5c?si=fNGivfqd3Sk9ba_2'
        }
      ],
      
      weeks: [
        {
          week: 1,
          topics: [
            'HTML basics: structure, headings, paragraphs, images, links, lists, forms',
            'CSS basics: selectors, colors, fonts, box model, flexbox, grid',
            'JavaScript basics: variables, data types, loops, functions, DOM manipulation',
            'Event Handling in JS'
          ],
          resources: [
            {
              type: 'video',
              title: 'HTML Crash Course',
              url: 'https://youtu.be/HcOc7P5BMi4?si=1bCssUt4KIKq_1jg',
              description: 'Complete HTML fundamentals'
            },
            {
              type: 'video',
              title: 'CSS Complete Tutorial',
              url: 'https://youtu.be/K1naz9wBwKU?si=gXcUChXSJEyKozLl',
              description: 'CSS from basics to advanced'
            },
            {
              type: 'video',
              title: 'Alternative CSS Tutorial',
              url: 'https://youtu.be/ESnrn1kAD4E?si=ElVc93lpNpCh8USx',
              description: 'Another comprehensive CSS guide'
            },
            {
              type: 'video',
              title: 'JavaScript Complete Playlist',
              url: 'https://youtube.com/playlist?list=PLGjplNEQ1it_oTvuLRNqXfz_v_0pq6unW&si=5v9sSFDnhV0x3lHK',
              description: 'JavaScript fundamentals and DOM manipulation'
            }
          ],
          project: {
            title: 'To-Do App (using JavaScript & Local Storage)',
            description: 'Build a fully functional to-do list application where users can add, edit, and delete tasks. Use JavaScript DOM manipulation to dynamically update the list and store all tasks in the browser\'s Local Storage so that the data persists even after refreshing or closing the browser.',
            resources: [
              {
                type: 'video',
                title: 'To-Do App Tutorial',
                url: 'https://youtu.be/gRkaen6MeQc?si=1PkztNFdsiE1wYv1'
              },
              {
                type: 'video',
                title: 'Deployment Guide',
                url: 'https://youtu.be/9srnyNC1e_o?si=umjLxfDT_UtDPLTh'
              }
            ]
          }
        },
        {
          week: 2,
          topics: [
            'API basics: What is API, JSON format',
            'Fetch API (fetch() method)',
            'Parsing & displaying API data dynamically in UI',
            'More practice with DOM & event handling'
          ],
          resources: [
            {
              type: 'video',
              title: 'API Basics Tutorial',
              url: 'https://youtu.be/XGa4onZP66Q?si=-QkMcMHLtm7hXlz0',
              description: 'Understanding APIs and JSON'
            },
            {
              type: 'video',
              title: 'Fetch API Tutorial',
              url: 'https://youtu.be/Atq7VjVbaA8?si=IosC8N8uv8_3p4iw',
              description: 'Working with Fetch API'
            },
            {
              type: 'video',
              title: 'API Integration Guide',
              url: 'https://youtu.be/CyGodpqcid4?si=yCGsJe7TNUvmcxwS',
              description: 'Practical API integration'
            }
          ],
          project: {
            title: 'Weather App using OpenWeather API',
            description: 'Create an interactive weather application that allows users to search for any city and get real-time weather details such as temperature, humidity, and weather conditions. Use JavaScript to fetch data from a free weather API (like OpenWeatherMap) and display it dynamically on the webpage.',
            resources: [
              {
                type: 'video',
                title: 'Weather App Tutorial',
                url: 'https://youtu.be/krUdJ87uxXc?si=PmRE8wjoufv6cFzC'
              },
              {
                type: 'link',
                title: 'OpenWeather API',
                url: 'https://openweathermap.org/api'
              },
              {
                type: 'video',
                title: 'Deployment Guide',
                url: 'https://youtu.be/9srnyNC1e_o?si=umjLxfDT_UtDPLTh'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'HTML structure & semantic tags',
        'CSS styling (selectors, colors, fonts, box model)',
        'Responsive layouts using Flexbox & Grid',
        'GitHub basics: creating repos, pushing code',
        'Building & deploying a static website',
        'JavaScript fundamentals (variables, functions, loops, DOM)',
        'Event handling in web apps',
        'Using Local Storage for persistent data',
        'Fetching & displaying API data',
        'Working with JSON',
        'Deploying simple JS projects'
      ]
    },
    
    {
      level: 2,
      title: 'Intermediate',
      goal: 'Build dynamic, full-stack applications.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Install Node.js & npm',
          url: 'https://youtu.be/uCgAuOYpJd0?si=ZKQ-Q948kRwHHVN1'
        },
        {
          step: 2,
          title: 'Choose a frontend framework',
          options: [
            { name: 'React.js', url: 'https://react.dev/learn' },
            { name: 'Vue.js', url: 'https://vuejs.org/guide/introduction' },
            { name: 'Next.js', url: 'https://nextjs.org/learn?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=home' }
          ]
        },
        {
          step: 3,
          title: 'Choose a database',
          options: [
            { name: 'MongoDB', url: 'https://www.mongodb.com/products/platform/atlas-database' },
            { name: 'Supabase', url: 'https://supabase.com/' }
          ]
        }
      ],
      
      resources: {
        frontend: [
          {
            title: 'React and Tailwind CSS',
            urls: [
              'https://youtu.be/E6tAtRi82QY?si=EXy-qpzc0Bo0GJJD',
              'https://youtu.be/LOH1l-MP_9k?si=5_CrZu76WClWrxF0',
              'https://youtu.be/-g969furGik?si=Izfts0twuNLqFHay'
            ]
          },
          {
            title: 'Vue.js',
            urls: ['https://youtu.be/VeNfHj6MhgA?si=289a4_yLzCGA4tw0']
          },
          {
            title: 'Next.js',
            urls: ['https://youtu.be/_EgI9WH8q1A?si=7KkSIBltb2nt_T-x']
          }
        ],
        backend: [
          {
            title: 'Node.js',
            urls: ['https://www.youtube.com/watch?v=BLl32FvcdVM']
          },
          {
            title: 'Express.js',
            urls: ['https://www.youtube.com/watch?v=pKJ4GGyDgJo']
          },
          {
            title: 'Socket.io Real-time Chat',
            urls: ['https://youtu.be/ZKEqqIO7n-k?si=FgDVxVBdR5HLhxOi']
          }
        ],
        database: [
          {
            title: 'MongoDB Atlas',
            urls: ['https://www.youtube.com/watch?v=tkAmFt64DCk']
          },
          {
            title: 'Supabase',
            urls: ['https://youtu.be/kyphLGnSz6Q?si=XyG7S-oBsztCKniV']
          }
        ]
      },
      
      weeks: [
        {
          week: 3,
          project: {
            title: 'E-Commerce Website with User Authentication',
            description: 'Build a full-stack e-commerce platform with authentication and a product catalog. Users should be able to browse products, add them to a cart, and simulate checkout (dummy payment). Secure sign-up, login, and logout must be implemented using JWT authentication.',
            coreFeatures: [
              'User Authentication: Sign Up, Login, Logout with JWT',
              'Product Catalog: Display product list with search and filter',
              'Shopping Cart: Add, remove, and update items',
              'Checkout Flow: Simulate payment process (no actual payment required)',
              'Responsive UI: Fully responsive design using chosen frontend framework',
              'Database Integration: Store products, user data, orders, and chat history in MongoDB or Supabase'
            ],
            resources: [
              {
                type: 'video',
                title: 'E-Commerce Tutorial Part 1',
                url: 'https://youtu.be/y99YgaQjgx4?si=3AbXOwAXhMwjmX_T'
              },
              {
                type: 'video',
                title: 'E-Commerce Tutorial Part 2',
                url: 'https://youtu.be/I0BOUiFe9WY?si=nIYHSbewrhriNvpC'
              },
              {
                type: 'video',
                title: 'Frontend Deployment',
                url: 'https://youtu.be/VigFI4TuwzI?si=ss33zRBwgQ9NH7Xs'
              },
              {
                type: 'video',
                title: 'Backend Deployment',
                url: 'https://youtu.be/A2VoUyZZMCw?si=BW6ZtMhF3E4vI3w4'
              }
            ]
          }
        },
        {
          week: 4,
          project: {
            title: 'Real-Time Chat Application',
            description: 'Build a full-stack chat application with user authentication and WebSocket/Socket.io integration. The chat can be one-to-one or user-to-support in real-time.',
            coreFeatures: [
              'User Authentication: Sign Up, Login, Logout',
              'Real-time Messaging: WebSocket / Socket.io',
              'Chat Rooms or User-to-Support communication',
              'Message persistence in MongoDB / Supabase',
              'Responsive UI: Chat interface styled with Tailwind'
            ],
            resources: [
              {
                type: 'video',
                title: 'Chat App Tutorial Playlist',
                url: 'https://youtube.com/playlist?list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf&si=-IXIFJEha3hnKSoI'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Building REST APIs with authentication & authorization',
        'Implementing JWT-based login systems',
        'Working with CRUD operations in MongoDB or Supabase',
        'Real-time communication with WebSockets/Socket.io',
        'Responsive UI design and integration with frontend frameworks',
        'Full-stack deployment'
      ]
    },
    
    {
      level: 3,
      title: 'Advanced',
      goal: 'Learn Docker for containerizing applications and build a professional, scalable full-stack architecture as your final major project.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Install Docker Desktop',
          options: [
            { name: 'Windows', url: 'https://youtu.be/JBEUKrjbWqg?si=Q0xKHIjbgw9SdcAz' },
            { name: 'Mac', url: 'https://youtu.be/-EXlfSsP49A?si=iHCL3TmvqxlcsmoP' }
          ]
        },
        {
          step: 2,
          title: 'Install Node.js & npm/yarn (if not already installed)'
        },
        {
          step: 3,
          title: 'Install Git & GitHub CLI',
          url: 'https://youtu.be/t2-l3WvWvqg?si=PA_cnTgbnQxraIMV'
        },
        {
          step: 4,
          title: 'Create accounts',
          accounts: [
            { name: 'Docker Hub', url: 'https://youtu.be/_JhZtsfmy20?si=nXUtlicOfQys1fXo' },
            { name: 'Hosting service', note: 'Render, Vercel, Railway, etc.' }
          ]
        }
      ],
      
      topicsToLearn: [
        'Docker Basics: Images, Containers, Volumes, Networks',
        'Writing a Dockerfile for frontend and backend',
        'Using docker-compose for multi-container applications',
        'Environment variables in Docker (.env handling)',
        'Connecting containers (Frontend ↔ Backend ↔ Database)',
        'Pushing images to Docker Hub',
        'Deploying Dockerized apps to cloud services'
      ],
      
      resources: [
        {
          type: 'video',
          title: 'Docker Crash Course for Beginners',
          url: 'https://youtu.be/pg19Z8LL06w?si=abcdef'
        },
        {
          type: 'video',
          title: 'Dockerizing a MERN App',
          url: 'https://youtu.be/gAkwW2tuIqE?si=abcdef'
        },
        {
          type: 'video',
          title: 'Docker Compose Basics',
          url: 'https://youtu.be/3c-iBn73dDE?si=abcdef'
        }
      ],
      
      weeks: [
        {
          week: 5,
          project: {
            title: 'Final Major Project - Vercel Clone',
            subtitle: 'Professional Scalable Architecture',
            description: 'Build a production-ready full-stack application with a scalable architecture. This project should demonstrate your ability to work with modern web frameworks, containerized environments, databases, and deployment pipelines. The aim is to simulate a real-world SaaS platform workflow.',
            coreFeatures: [
              'Authentication & Authorization (JWT / OAuth)',
              'Multi-user dashboard with personalized data',
              'Project creation & management features',
              'File uploads & processing (if applicable)',
              'Database integration with MongoDB/Supabase',
              'Real-time updates (WebSockets or server-sent events)',
              'Containerized deployment using Docker & Docker Compose',
              'CI/CD pipeline for automated deployments'
            ],
            techStackChoices: {
              frontend: ['React.js', 'Next.js', 'Vue.js'],
              backend: ['Node.js + Express.js', 'Next.js API Routes', 'Nest.js'],
              database: ['MongoDB Atlas', 'Supabase'],
              containerization: ['Docker', 'Docker Compose'],
              deployment: ['Render', 'Railway', 'Vercel', 'AWS', 'DigitalOcean']
            },
            resources: [
              {
                type: 'video',
                title: 'Vercel Clone Tutorial Part 1',
                url: 'https://youtu.be/0A_JpLYG7hM?si=BRnfQrG1PblGx4k8'
              },
              {
                type: 'video',
                title: 'Vercel Clone Tutorial Part 2',
                url: 'https://youtu.be/c8_tafixiAs?si=X6Pr6seWrsvwIh64'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Designing scalable full-stack architecture',
        'Containerizing and orchestrating services',
        'Working with cloud-hosted databases',
        'Implementing advanced authentication flows',
        'Managing multi-service applications',
        'Deploying Dockerized applications to production'
      ]
    }
  ],
  
  outcome: {
    projects: [
      'To-Do App (Week 1)',
      'Weather App (Week 2)',
      'E-Commerce Website (Week 3)',
      'Chat Application (Week 4)',
      'Final Major Project - Vercel Clone (Week 5)'
    ],
    submissionRequirements: {
      mandatory: ['GitHub Repository link'],
      preferred: ['Live deployed link'],
      linkedinPost: {
        required: true,
        shouldInclude: [
          'Short demo video of your project',
          'The skills you gained',
          'Hashtags: #DevSource #DevCamp',
          'Tag DevSource in your post'
        ]
      }
    },
    certification: {
      title: 'DevSource E-Certificate of Participation',
      requirements: ['Submit all 5 projects on time']
    }
  }
};

export default webDevTrack;