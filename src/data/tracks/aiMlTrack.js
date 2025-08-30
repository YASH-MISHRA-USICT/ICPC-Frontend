// aiMlTrack.js - Detailed AI/ML Track Data

export const aiMlTrack = {
  id: 'ai-ml',
  title: 'AI/ML Development',
  description: 'Master artificial intelligence and machine learning from absolute beginner to building production AI systems.',
  color: 'purple',
  icon: '🤖',
  totalWeeks: 8,
  
  vision: `This roadmap is designed for absolute beginners with zero programming experience. We'll guide you from never having coded before to building amazing AI applications that can recognize images, understand text, and make predictions. Think of it as your personal AI learning journey where every step is explained in simple terms!`,
  
  whatYouWillGain: [
    'Python programming skills - Start from "What is programming?" to writing your own code',
    'Data science superpowers - Turn messy data into beautiful insights and predictions',
    'AI model building - Create your own image recognition, chatbots, and prediction systems',
    'Real-world projects - Build 8 impressive projects for your portfolio',
    'Job-ready skills - Everything employers want in AI/ML professionals',
    'Confidence - Go from "I can\'t code" to "I built an AI system!"',
    'Professional certificate - Showcase your new AI skills to the world'
  ],
  
  whoCanSkipWhat: [
    {
      level: 'Complete Beginner',
      condition: 'Zero programming experience',
      recommendation: 'Start from Level 1',
      canSkip: false
    },
    {
      level: 'Know some Python',
      condition: 'Basic Python knowledge',
      recommendation: 'Skip to Level 2',
      canSkip: true
    },
    {
      level: 'Built websites before',
      condition: 'Web development experience',
      recommendation: 'Start Level 2, focus on AI parts',
      canSkip: true
    },
    {
      level: 'Have ML experience',
      condition: 'Machine learning background',
      recommendation: 'Jump to Level 3',
      canSkip: true
    },
    {
      level: 'Final Project',
      condition: 'Everyone must complete for certification',
      canSkip: false
    }
  ],
  
  levels: [
    {
      level: 1,
      title: 'Complete Beginner - "I\'ve Never Coded Before"',
      goal: 'Learn Python from absolute zero and build your first data projects!',
      weeks: [1, 2],
      
      setupGuide: [
        {
          step: 1,
          title: 'Install Python',
          url: 'https://python.org/downloads',
          options: [
            { name: 'Python 3.12+', url: 'https://python.org/downloads' }
          ]
        },
        {
          step: 2,
          title: 'Get Your Code Editor',
          url: 'https://code.visualstudio.com',
          options: [
            { name: 'VS Code', url: 'https://code.visualstudio.com' },
            { name: 'Python Extension', url: 'https://marketplace.visualstudio.com/items?itemName=ms-python.python' }
          ]
        },
        {
          step: 3,
          title: 'Create Free Accounts',
          accounts: [
            { name: 'GitHub', url: 'https://github.com/', note: 'for saving your code' },
            { name: 'Google Colab', url: 'https://colab.google.com/', note: 'for running code in browser' },
            { name: 'Kaggle', url: 'https://www.kaggle.com/', note: 'for datasets and practice' }
          ]
        }
      ],
      
      weeks: [
        {
          week: 1,
          title: 'Python Fundamentals (Your First Steps!)',
          topics: [
            'What is programming? (Think of it as giving instructions to a computer)',
            'Variables (like labeled boxes to store information)',
            'Basic math operations (+, -, *, /)',
            'Working with text and numbers',
            'Making decisions with if/else (like "if it\'s raining, take umbrella")',
            'Loops (doing the same thing multiple times automatically)'
          ],
          resources: [
            {
              type: 'link',
              title: 'FREE Python Course',
              url: 'https://www.learnpython.org/',
              description: 'Start here! Interactive and free'
            },
            {
              type: 'video',
              title: 'Microsoft\'s Python for Beginners',
              url: 'https://learn.microsoft.com/en-us/shows/intro-to-python-development/',
              description: 'Video series, very friendly'
            },
            {
              type: 'pdf',
              title: 'Official Python Tutorial',
              url: 'https://docs.python.org/3/tutorial/index.html',
              description: 'Reference when stuck'
            },
            {
              type: 'video',
              title: 'Python Crash Course',
              url: 'https://youtu.be/K5KVEU3aaeQ?si=YWc5TPFRJohTWhQh',
              description: 'Comprehensive YouTube tutorial'
            }
          ],
          project: {
            title: 'Personal Budget Calculator',
            description: 'Build a simple program that helps track monthly expenses and calculates savings!',
            coreFeatures: [
              'Ask user for income and expenses',
              'Calculate remaining money',
              'Give advice based on spending patterns',
              'Save results to a file'
            ],
            resources: [
              {
                type: 'video',
                title: 'Step-by-step tutorial',
                url: '#',
                description: 'Will be provided in course materials'
              }
            ]
          }
        },
        {
          week: 2,
          title: 'Data Handling & Basic Analysis',
          topics: [
            'Working with Excel-like data in Python (using Pandas)',
            'Basic math operations on large datasets (NumPy)',
            'Reading files (CSV, Excel)',
            'Cleaning messy data',
            'Finding patterns in numbers'
          ],
          resources: [
            {
              type: 'link',
              title: 'Pandas for Beginners',
              url: 'https://www.datacamp.com/blog/how-to-learn-python-expert-guide',
              description: 'Free introductory content'
            },
            {
              type: 'pdf',
              title: 'NumPy Tutorial',
              url: 'https://numpy.org/doc/stable/user/quickstart.html',
              description: 'Official guide with examples'
            },
            {
              type: 'link',
              title: 'Data Analysis with Python',
              url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
              description: 'Complete free course'
            },
            {
              type: 'video',
              title: 'Pandas Tutorial',
              url: 'https://youtu.be/2uvysYbKdjM?si=wIU9y9PEN6yxidT9',
              description: 'Comprehensive video guide'
            }
          ],
          project: {
            title: 'Personal Fitness Data Analyzer',
            description: 'Analyze your daily steps, sleep, or workout data to find patterns!',
            coreFeatures: [
              'Load fitness data from CSV file',
              'Calculate daily/weekly/monthly averages',
              'Find your best and worst days',
              'Identify trends over time',
              'Create a simple report with recommendations'
            ],
            resources: [
              {
                type: 'link',
                title: 'Sample Dataset',
                url: 'https://drive.google.com/file/d/1TLiALFsuVYNleVqKxZmw_Z7jJr5SvjHR/view?usp=sharing',
                description: 'Download sample fitness data'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Write Python programs from scratch',
        'Work with numbers, text, and files',
        'Load and analyze data from Excel/CSV files',
        'Create basic calculations and reports',
        'Use GitHub to save and share your code',
        'Debug simple problems',
        'Feel confident calling yourself "someone who can code"!'
      ]
    },
    
    {
      level: 2,
      title: 'Intermediate - "I Can Code, Teach Me AI!"',
      goal: 'Build your first machine learning models and understand how AI actually works!',
      weeks: [3, 4],
      
      setupGuide: [
        {
          step: 1,
          title: 'Install ML Libraries',
          options: [
            { name: 'scikit-learn', url: 'https://scikit-learn.org/stable/install.html' },
            { name: 'matplotlib', url: 'https://matplotlib.org/stable/users/installing/index.html' },
            { name: 'seaborn', url: 'https://seaborn.pydata.org/installing.html' }
          ]
        },
        {
          step: 2,
          title: 'Create ML Accounts',
          accounts: [
            { name: 'Weights & Biases', url: 'https://wandb.ai/', note: 'track your AI experiments' },
            { name: 'Streamlit Cloud', url: 'https://share.streamlit.io/', note: 'deploy your apps' }
          ]
        }
      ],
      
      weeks: [
        {
          week: 3,
          title: 'Your First AI Models',
          topics: [
            'What is Machine Learning? (Teaching computers to find patterns)',
            'Supervised Learning (Learning from examples, like teaching a child with flashcards)',
            'Regression (Predicting numbers: "How much will this house cost?")',
            'Classification (Putting things in categories: "Is this email spam?")',
            'Training vs Testing (Teaching vs examining)'
          ],
          resources: [
            {
              type: 'link',
              title: 'Google\'s ML Crash Course',
              url: 'https://developers.google.com/machine-learning/crash-course',
              description: 'FREE, high-quality, visual'
            },
            {
              type: 'link',
              title: 'Machine Learning Explained',
              url: 'https://www.freecodecamp.org/news/learn-machine-learning-in-2024/',
              description: 'Recent comprehensive guide'
            },
            {
              type: 'link',
              title: 'Coursera ML Course',
              url: 'https://www.coursera.org/learn/machine-learning',
              description: 'Andrew Ng\'s famous course - audit for free'
            }
          ],
          project: {
            title: 'Smart House Price Predictor',
            description: 'Build an AI that can predict house prices better than simple math!',
            coreFeatures: [
              'Takes house features (size, rooms, location, etc.)',
              'Uses 3 different AI algorithms to predict price',
              'Compares which method works best',
              'Creates a simple web interface where anyone can get predictions',
              'Shows confidence in predictions'
            ],
            resources: [
              {
                type: 'video',
                title: 'House Price Prediction Tutorial',
                url: 'https://youtu.be/Wqmtf9SA_kk?si=fVj0PzdHdjbRCELs',
                description: 'Reference Video'
              }
            ]
          }
        },
        {
          week: 4,
          title: 'Advanced ML & Clustering',
          topics: [
            'Unsupervised Learning: Finding hidden patterns without examples',
            'Clustering: Grouping similar things together automatically',
            'Dimensionality Reduction: Simplifying complex data',
            'Model Evaluation: How to know if your AI is actually good',
            'Feature Engineering: Making your data better for AI'
          ],
          resources: [
            {
              type: 'link',
              title: 'Udemy Free ML Courses',
              url: 'https://www.udemy.com/topic/machine-learning/free/',
              description: 'Various instructors, multiple approaches'
            },
            {
              type: 'link',
              title: 'DataCamp ML Track',
              url: 'https://www.datacamp.com/category/machine-learning',
              description: 'Interactive, project-based'
            },
            {
              type: 'pdf',
              title: 'Scikit-Learn Documentation',
              url: 'https://scikit-learn.org/stable/tutorial/index.html',
              description: 'Official tutorials'
            }
          ],
          project: {
            title: 'Customer Personality Analyzer',
            description: 'Build an AI system that automatically groups customers and predicts their behavior!',
            coreFeatures: [
              'Analyzes customer shopping patterns',
              'Automatically finds different customer types (clusters)',
              'Predicts which customers might stop buying (churn prediction)',
              'Creates customer personas with descriptions',
              'Recommends marketing strategies for each group',
              'Dashboard showing insights and recommendations'
            ],
            resources: [
              {
                type: 'video',
                title: 'Customer Analysis Tutorial',
                url: 'https://youtu.be/aOrRgWy219E?si=rzYDVfWweKlKyEFk',
                description: 'Reference Video - Dataset is provided in the video description'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Understand how AI/ML actually works',
        'Build prediction models for numbers and categories',
        'Evaluate if your models are good or bad',
        'Find hidden patterns in data',
        'Create web applications for your AI models',
        'Explain AI concepts to non-technical people',
        'Ready to tackle more advanced AI topics!'
      ]
    },
    
    {
      level: 3,
      title: 'Advanced - "Deep Learning & AI Specializations"',
      goal: 'Master computer vision (image AI) and natural language processing (text AI)!',
      weeks: [5, 6],
      
      setupGuide: [
        {
          step: 1,
          title: 'Install Deep Learning Libraries',
          options: [
            { name: 'TensorFlow', url: 'https://www.tensorflow.org/install' },
            { name: 'PyTorch', url: 'https://pytorch.org/get-started/locally/' },
            { name: 'OpenCV', url: 'https://pypi.org/project/opencv-python/' }
          ]
        },
        {
          step: 2,
          title: 'Cloud Computing Setup',
          accounts: [
            { name: 'Google Colab Pro', url: 'https://colab.research.google.com/', note: 'recommended for GPU access' },
            { name: 'Kaggle Kernels', url: 'https://www.kaggle.com/code', note: 'free GPU time' },
            { name: 'Hugging Face Spaces', url: 'https://huggingface.co/spaces', note: 'free AI app hosting' }
          ]
        }
      ],
      
      weeks: [
        {
          week: 5,
          title: 'Computer Vision (Teaching Computers to "See")',
          topics: [
            'Neural Networks (Copying how human brain works)',
            'Convolutional Neural Networks (Special networks for images)',
            'Image Classification (Teaching computers to recognize objects)',
            'Transfer Learning (Using pre-trained smart models)',
            'Object Detection (Finding and identifying objects in photos)'
          ],
          resources: [
            {
              type: 'pdf',
              title: 'TensorFlow Image Classification',
              url: 'https://www.tensorflow.org/tutorials/images/classification',
              description: 'Official TensorFlow guide'
            },
            {
              type: 'pdf',
              title: 'PyTorch Computer Vision',
              url: 'https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html',
              description: 'PyTorch official tutorial'
            },
            {
              type: 'link',
              title: 'Fast.ai Practical Deep Learning',
              url: 'https://course.fast.ai/',
              description: 'Practical, top-down approach'
            }
          ],
          project: {
            title: 'Multi-Purpose AI Vision System',
            description: 'Build an intelligent image analysis platform that can do multiple vision tasks!',
            coreFeatures: [
              'Smart Photo Classifier: Recognizes 1000+ different objects',
              'Medical Image Analyzer: Detects potential health issues in X-rays',
              'Plant Disease Detector: Helps farmers identify crop problems',
              'Face Analysis: Age, emotion, and demographic prediction',
              'Real-time Camera Processing: Works with webcam or phone camera',
              'Batch Processing: Analyze hundreds of images at once'
            ],
            resources: [
              {
                type: 'video',
                title: 'Computer Vision Project Tutorial',
                url: 'https://youtu.be/B-1qwKvJI64?si=BA0jVdyQ_ghdVUdQ',
                description: 'Reference Video'
              }
            ]
          }
        },
        {
          week: 6,
          title: 'Natural Language Processing - Teaching Computers to Understand Text',
          topics: [
            'Text Processing: Cleaning and preparing text data',
            'Sentiment Analysis: Understanding emotions in text',
            'Named Entity Recognition: Finding names, places, dates in text',
            'Text Classification: Categorizing documents automatically',
            'Language Models: How ChatGPT-style models work',
            'Text Generation: Creating human-like text'
          ],
          resources: [
            {
              type: 'link',
              title: 'Hugging Face Course',
              url: 'https://huggingface.co/course/chapter1/1',
              description: 'Modern NLP with transformers'
            },
            {
              type: 'pdf',
              title: 'NLTK Tutorial',
              url: 'https://www.nltk.org/book/',
              description: 'Natural Language Toolkit basics'
            },
            {
              type: 'link',
              title: 'spaCy Course',
              url: 'https://course.spacy.io/',
              description: 'Industrial-strength NLP'
            }
          ],
          project: {
            title: 'Intelligent Text Analytics Platform',
            description: 'Create a comprehensive NLP system that can understand and generate human language!',
            coreFeatures: [
              'Smart Chatbot: Context-aware conversation with memory',
              'Sentiment Dashboard: Analyze social media, reviews, feedback',
              'Document Intelligence: Summarize, extract key info, answer questions',
              'Content Generator: Create marketing copy, emails, articles',
              'Multi-Language Support: Works with 50+ languages',
              'Real-time Analysis: Process live text streams'
            ],
            resources: [
              {
                type: 'video',
                title: 'NLP Project Tutorial',
                url: 'https://youtu.be/dIUTsFT2MeQ?si=m0dKGK4k0aVv2-AF',
                description: 'Reference Video'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Build AI systems that can "see" and understand images',
        'Create chatbots and text analysis tools',
        'Use state-of-the-art pre-trained models',
        'Fine-tune models for specific use cases',
        'Deploy AI applications that people can actually use',
        'Understand how modern AI systems (like ChatGPT) work',
        'Ready for advanced AI engineering roles!'
      ]
    },
    
    {
      level: 4,
      title: 'Advanced - "Production AI & Career Ready"',
      goal: 'Deploy professional AI systems and build your dream capstone project!',
      weeks: [7, 8],
      
      setupGuide: [
        {
          step: 1,
          title: 'Professional Tools Setup',
          options: [
            { name: 'MLflow', url: 'https://mlflow.org/docs/latest/quickstart.html' },
            { name: 'Docker', url: 'https://docs.docker.com/get-started/' },
            { name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' }
          ]
        },
        {
          step: 2,
          title: 'Cloud & Deployment Accounts',
          accounts: [
            { name: 'AWS Free Tier', url: 'https://aws.amazon.com/free/', note: 'cloud hosting' },
            { name: 'Google Cloud Free', url: 'https://cloud.google.com/free', note: 'alternative cloud' },
            { name: 'Railway', url: 'https://railway.app/', note: 'easy deployment' }
          ]
        }
      ],
      
      weeks: [
        {
          week: 7,
          title: 'MLOps & Professional Deployment',
          topics: [
            'MLOps: How to manage AI systems in real companies',
            'Model Versioning: Keeping track of different AI model versions',
            'Automated Testing: Making sure your AI doesn\'t break',
            'Monitoring: Watching your AI in production',
            'Containerization: Packaging AI apps to run anywhere',
            'CI/CD for AI: Automatically deploying model updates'
          ],
          resources: [
            {
              type: 'link',
              title: 'MLOps Course',
              url: 'https://www.coursera.org/learn/machine-learning-engineering-for-production-mlops',
              description: 'Stanford\'s MLOps specialization'
            },
            {
              type: 'link',
              title: 'Weights & Biases Course',
              url: 'https://wandb.ai/site/courses',
              description: 'Free MLOps training'
            },
            {
              type: 'pdf',
              title: 'MLflow Documentation',
              url: 'https://mlflow.org/docs/latest/tutorials-and-examples/index.html',
              description: 'Model management'
            }
          ],
          project: {
            title: 'Production ML Pipeline - Forensics Platform',
            description: 'Build a complete forensics platform that can call different APIs for text analysis (like Gemini or Grok) and also run local models like ResNet50 for image classification.',
            coreFeatures: [
              'Real-time Serving: Handle multiple predictions per second',
              'Monitoring Dashboard: Track performance, errors, user behavior',
              'Automated Alerts: Email/Slack notifications for problems',
              'Version Control: Roll back to previous models if needed',
              'Multi-modal Analysis: Both text and image processing',
              'API Integration: Connect to external AI services'
            ],
            resources: [
              {
                type: 'video',
                title: 'FastAPI Tutorial',
                url: 'https://youtu.be/rvFsGRvj9jo?si=7rSjUZ9YApVA2hqj',
                description: 'Building APIs for ML'
              },
              {
                type: 'video',
                title: 'Docker Tutorial',
                url: 'https://youtu.be/pg19Z8LL06w?si=H5zv5fwo-eY6zGnj',
                description: 'Containerization basics'
              }
            ]
          }
        },
        {
          week: 8,
          title: 'Capstone Project - Your AI Portfolio Showcase',
          topics: [
            'Project Planning: Scoping and requirements gathering',
            'System Architecture: Designing scalable AI applications',
            'User Experience: Creating intuitive AI interfaces',
            'Documentation: Writing technical and user guides',
            'Presentation Skills: Communicating technical concepts',
            'Portfolio Development: Showcasing your AI expertise'
          ],
          resources: [
            {
              type: 'link',
              title: 'AI Project Ideas',
              url: 'https://github.com/topics/artificial-intelligence',
              description: 'Inspiration from GitHub'
            },
            {
              type: 'link',
              title: 'Streamlit Documentation',
              url: 'https://docs.streamlit.io/',
              description: 'Building web apps for AI'
            },
            {
              type: 'link',
              title: 'Gradio Documentation',
              url: 'https://gradio.app/docs/',
              description: 'Alternative for AI interfaces'
            }
          ],
          project: {
            title: 'Custom AI Application - Choose Your Own Adventure',
            description: 'Build a complete, working AI application that demonstrates your skills - realistic scope, impressive results!',
            coreFeatures: [
              'Choose from 4 project templates or create your own',
              'Full-stack implementation with frontend and backend',
              'Real-world problem solving with AI',
              'Professional deployment and documentation',
              'Live demo and presentation',
              'Open source contribution ready'
            ],
            resources: [
              {
                type: 'pdf',
                title: 'Capstone Project Guide',
                url: '#',
                description: 'Detailed requirements and rubric'
              },
              {
                type: 'video',
                title: 'Project Presentation Tips',
                url: '#',
                description: 'How to showcase your work'
              }
            ]
          }
        }
      ],
      
      skillsGained: [
        'Build and deploy a complete AI application',
        'Create user-friendly interfaces for AI models',
        'Handle file uploads and data processing',
        'Deploy apps to free cloud platforms',
        'Present technical projects clearly',
        'Build a portfolio piece you\'re proud to share',
        'Ready for entry-level AI/ML positions!'
      ]
    }
  ],
  
  outcome: {
    projects: [
      'Personal Budget Calculator - Python fundamentals',
      'Fitness Data Analyzer - Data analysis skills',
      'Smart House Price Predictor - First ML model',
      'Customer Personality Analyzer - Advanced ML & clustering',
      'AI Vision System - Computer vision expertise',
      'Text Analytics Platform - NLP mastery',
      'Production ML Pipeline - MLOps and deployment',
      'Custom AI Application - Full-stack AI application'
    ],
    
    submissionRequirements: {
      mandatory: [
        'GitHub Repository with clean, documented code',
        'Live Demo Link (deployed and accessible)',
        '2-minute Demo Video showcasing key features',
        'Technical README explaining setup and usage'
      ],
      preferred: [
        'LinkedIn Post sharing your progress and learnings',
        'Technical Blog Post (500+ words) with implementation details',
        'Peer code review participation',
        'Community forum contributions'
      ],
      linkedinPost: {
        required: true,
        shouldInclude: [
          'Project screenshots or demo GIFs',
          'Key technologies used',
          'Challenges overcome during development',
          'Links to GitHub repository and live demo',
          'Lessons learned and next steps',
          'Thank you to mentors and community'
        ]
      }
    },
    
    certification: {
      title: 'DevCamp AI/ML Expert Certificate',
      requirements: [
        'Submit all 8 projects on time with working demos',
        'Code quality score of 8/10 or higher (automated review)',
        'Pass final technical assessment (multiple choice + coding)',
        'Complete peer review of 2 other students\' capstone projects',
        'Active participation in community discussions',
        'Successful live demo presentation (15-minute presentation + Q&A)'
      ]
    }
  }
};

export default aiMlTrack;