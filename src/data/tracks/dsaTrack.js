// dsaTrack.js - Detailed DSA Bootcamp Track Data

export const dsaTrack = {
  id: 'dsa',
  title: 'Data Structures & Algorithms',
  description: 'Master DSA concepts, problem-solving techniques, and ace coding interviews with hands-on practice.',
  color: 'purple',
  icon: '🧮',
  totalWeeks: 4,
  
  vision: `The vision of this DSA Bootcamp is to transform you from a coding beginner to a confident problem solver who can tackle complex algorithmic challenges. This intensive 4-week program is designed to build strong foundations in data structures and algorithms, prepare you for technical interviews at top tech companies, and develop a systematic approach to problem-solving. Through hands-on practice, real-world applications, and competitive programming, you'll gain the skills that top tech companies look for.`,
  
  whatYouWillGain: [
    'Deep understanding of fundamental and advanced data structures (Arrays, Linked Lists, Trees, Graphs, Heaps, etc.)',
    'Mastery of algorithm design paradigms (Greedy, Dynamic Programming, Divide & Conquer, Backtracking)',
    'Strong problem-solving skills with 100+ LeetCode/Codeforces problems solved',
    'Interview preparation for top tech companies (FAANG, Microsoft, Google, Amazon)',
    'Competitive programming skills for contests like ICPC, CodeChef, Codeforces',
    'Time and space complexity analysis expertise',
    'Portfolio of solved problems on LeetCode, Codeforces, and GitHub',
    'Certificate of Completion to showcase on LinkedIn and resume'
  ],
  
  whoCanSkipWhat: [
    {
      level: 'Level 1',
      condition: 'if you already know basic programming (variables, loops, functions, arrays)',
      canSkip: true,
      note: 'But still solve the practice problems'
    },
    {
      level: 'Level 2',
      condition: 'if you are comfortable with basic DSA (stacks, queues, sorting)',
      canSkip: true,
      note: 'Move directly to Level 3'
    },
    {
      level: 'Level 3 & 4',
      condition: 'Advanced topics - essential for interviews and competitive programming',
      canSkip: false,
      note: 'These levels are mandatory for everyone'
    }
  ],
  
  levels: [
    {
      level: 1,
      title: 'Foundation',
      goal: 'Build strong programming fundamentals and learn basic problem-solving techniques. Understand time/space complexity and master arrays and strings.',
      
      setupGuide: [
        {
          step: 1,
          title: 'Choose Your Programming Language',
          options: [
            {
              name: 'C++ (Recommended for Competitive Programming)',
              url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y'
            },
            {
              name: 'Python (Great for Interviews)',
              url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc'
            },
            {
              name: 'Java (Industry Standard)',
              url: 'https://www.youtube.com/watch?v=eIrMbAQSU34'
            }
          ]
        },
        {
          step: 2,
          title: 'Setup Your Coding Environment',
          url: 'https://www.youtube.com/watch?v=1ZfO149BJvg',
          options: [
            {
              name: 'VS Code (Lightweight)',
              url: 'https://code.visualstudio.com/'
            },
            {
              name: 'IntelliJ IDEA (For Java)',
              url: 'https://www.jetbrains.com/idea/'
            },
            {
              name: 'PyCharm (For Python)',
              url: 'https://www.jetbrains.com/pycharm/'
            }
          ]
        },
        {
          step: 3,
          title: 'Create Accounts on Coding Platforms',
          accounts: [
            {
              name: 'LeetCode',
              url: 'https://leetcode.com/',
              note: 'Primary platform for interview prep'
            },
            {
              name: 'Codeforces',
              url: 'https://codeforces.com/',
              note: 'For competitive programming'
            },
            {
              name: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/',
              note: 'For learning and practice'
            },
            {
              name: 'GitHub',
              url: 'https://github.com/',
              note: 'To maintain your code repository'
            }
          ]
        },
        {
          step: 4,
          title: 'Join Communities',
          accounts: [
            {
              name: 'Discord - DSA Bootcamp Server',
              url: '#',
              note: 'Get help from peers and mentors'
            },
            {
              name: 'LeetCode Discussion Forums',
              url: 'https://leetcode.com/discuss/',
              note: 'Learn from others solutions'
            }
          ]
        }
      ],
      
      weeks: [
        {
          week: 1,
          topics: [
            'Programming fundamentals: variables, data types, operators',
            'Control structures: if-else, switch, loops (for, while)',
            'Functions and recursion basics',
            'Input/output operations',
            'Basic math operations and modular arithmetic'
          ],
          resources: [
            {
              type: 'video',
              title: 'C++ Complete Course',
              url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
              description: 'Comprehensive C++ tutorial for beginners'
            },
            {
              type: 'video',
              title: 'Time Complexity Analysis',
              url: 'https://www.youtube.com/watch?v=KXAbAa1mieU',
              description: 'Understanding Big O notation'
            },
            {
              type: 'link',
              title: 'GeeksforGeeks - Time Complexity',
              url: 'https://www.geeksforgeeks.org/time-complexity-and-space-complexity/',
              description: 'Detailed article on complexity analysis'
            }
          ],
          project: {
            title: 'Solve 15 Basic Problems',
            description: 'Start your coding journey by solving fundamental programming problems',
            coreFeatures: [
              'Variables and operators problems',
              'Loop-based pattern printing',
              'Basic math problems (prime numbers, GCD, LCM)',
              'Simple recursion problems',
              'String manipulation basics'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode Easy Problems',
                url: 'https://leetcode.com/problemset/all/?difficulty=EASY'
              },
              {
                type: 'link',
                title: 'Codeforces - Div 3/4 Problems',
                url: 'https://codeforces.com/problemset'
              }
            ]
          }
        },
        {
          week: 2,
          topics: [
            'Arrays: declaration, traversal, searching',
            'Two pointer technique',
            'Sliding window basics',
            'Prefix sum array',
            'Array manipulation and rotation'
          ],
          resources: [
            {
              type: 'video',
              title: 'Arrays Complete Tutorial',
              url: 'https://www.youtube.com/watch?v=AT14lCXuMKI',
              description: 'Everything about arrays in DSA'
            },
            {
              type: 'video',
              title: 'Two Pointer Technique',
              url: 'https://www.youtube.com/watch?v=On9kn-R2AqU',
              description: 'Master the two pointer approach'
            },
            {
              type: 'link',
              title: 'Sliding Window Pattern',
              url: 'https://www.geeksforgeeks.org/window-sliding-technique/',
              description: 'Learn sliding window technique'
            }
          ],
          project: {
            title: 'Solve 20 Array Problems',
            description: 'Master array manipulation and optimization techniques',
            coreFeatures: [
              'Linear search and binary search',
              'Kadane\'s algorithm (Maximum subarray)',
              'Two sum, three sum problems',
              'Array rotation and reversal',
              'Merge two sorted arrays'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode Array Problems',
                url: 'https://leetcode.com/tag/array/'
              },
              {
                type: 'pdf',
                title: 'Array Patterns Cheatsheet',
                url: '#'
              }
            ]
          }
        }
      ],
      skillsGained: [
        'Strong programming fundamentals',
        'Time and space complexity analysis',
        'Array manipulation techniques',
        'Two pointer and sliding window patterns',
        'Problem-solving confidence'
      ]
    },
    {
      level: 2,
      title: 'Intermediate',
      goal: 'Learn fundamental data structures and basic algorithms. Master sorting, searching, and recursion.',
      
      weeks: [
        {
          week: 3,
          topics: [
            'Strings: manipulation, pattern matching',
            'String hashing',
            'KMP algorithm basics',
            'Palindrome problems',
            'Anagram and substring problems'
          ],
          resources: [
            {
              type: 'video',
              title: 'String Algorithms',
              url: 'https://www.youtube.com/watch?v=GTJr8OvyEVQ',
              description: 'Complete string manipulation guide'
            },
            {
              type: 'video',
              title: 'KMP Algorithm',
              url: 'https://www.youtube.com/watch?v=V5-7GzOfADQ',
              description: 'Pattern matching algorithm'
            }
          ],
          project: {
            title: 'Solve 15 String Problems',
            description: 'Master string manipulation and pattern matching',
            coreFeatures: [
              'Reverse string and words',
              'Longest common prefix',
              'Valid palindrome checks',
              'String compression',
              'Pattern matching problems'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode String Problems',
                url: 'https://leetcode.com/tag/string/'
              }
            ]
          }
        },
        {
          week: 4,
          topics: [
            'Linked Lists: singly, doubly, circular',
            'Linked list traversal and manipulation',
            'Fast and slow pointer technique',
            'Cycle detection in linked lists',
            'Merge and reverse linked lists'
          ],
          resources: [
            {
              type: 'video',
              title: 'Linked Lists Complete Course',
              url: 'https://www.youtube.com/watch?v=R9PTBwOzceo',
              description: 'Everything about linked lists'
            },
            {
              type: 'video',
              title: 'Floyd\'s Cycle Detection',
              url: 'https://www.youtube.com/watch?v=-YiQZi3mLq0',
              description: 'Detect cycles in linked lists'
            }
          ],
          project: {
            title: 'Solve 15 Linked List Problems',
            description: 'Master pointer manipulation and linked list operations',
            coreFeatures: [
              'Reverse a linked list',
              'Detect cycle in linked list',
              'Merge two sorted lists',
              'Remove nth node from end',
              'Find middle of linked list'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode Linked List Problems',
                url: 'https://leetcode.com/tag/linked-list/'
              }
            ]
          }
        },
        {
          week: 5,
          topics: [
            'Stacks: implementation and applications',
            'Queues: implementation, circular queue',
            'Monotonic stack problems',
            'Next greater element pattern',
            'Stack using queues and vice versa'
          ],
          resources: [
            {
              type: 'video',
              title: 'Stack and Queue Complete Guide',
              url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
              description: 'Stack and queue data structures'
            },
            {
              type: 'video',
              title: 'Monotonic Stack',
              url: 'https://www.youtube.com/watch?v=Dq_ObZwTY_Q',
              description: 'Advanced stack technique'
            }
          ],
          project: {
            title: 'Solve 15 Stack & Queue Problems',
            description: 'Master stack and queue operations',
            coreFeatures: [
              'Valid parentheses',
              'Next greater element',
              'Min stack implementation',
              'Implement queue using stacks',
              'Sliding window maximum'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode Stack Problems',
                url: 'https://leetcode.com/tag/stack/'
              }
            ]
          }
        },
        {
          week: 6,
          topics: [
            'Sorting algorithms: bubble, selection, insertion',
            'Merge sort and quick sort',
            'Counting sort, radix sort',
            'Binary search and its variants',
            'Search in rotated arrays'
          ],
          resources: [
            {
              type: 'video',
              title: 'Sorting Algorithms Visualized',
              url: 'https://www.youtube.com/watch?v=kPRA0W1kECg',
              description: 'All sorting algorithms explained'
            },
            {
              type: 'video',
              title: 'Binary Search Complete Guide',
              url: 'https://www.youtube.com/watch?v=f6UU7V3szVw',
              description: 'Master binary search'
            }
          ],
          project: {
            title: 'Solve 15 Sorting & Searching Problems',
            description: 'Master sorting and binary search techniques',
            coreFeatures: [
              'Implement all sorting algorithms',
              'Binary search variants',
              'Search in 2D matrix',
              'Find peak element',
              'Median of two sorted arrays'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode Binary Search',
                url: 'https://leetcode.com/tag/binary-search/'
              }
            ]
          }
        }
      ],
      skillsGained: [
        'Data structure implementation',
        'Linked list pointer manipulation',
        'Stack and queue applications',
        'Sorting and searching mastery',
        'Problem pattern recognition'
      ]
    },
    {
      level: 3,
      title: 'Advanced',
      goal: 'Master advanced data structures and algorithm design techniques. Learn trees, graphs, and dynamic programming.',
      
      weeks: [
        {
          week: 7,
          topics: [
            'Binary trees: traversals (inorder, preorder, postorder)',
            'Binary search trees (BST)',
            'Tree construction problems',
            'Lowest common ancestor',
            'Tree diameter and height problems'
          ],
          resources: [
            {
              type: 'video',
              title: 'Binary Trees Complete Course',
              url: 'https://www.youtube.com/watch?v=fAAZixBzIAI',
              description: 'Everything about binary trees'
            },
            {
              type: 'video',
              title: 'BST Operations',
              url: 'https://www.youtube.com/watch?v=5cU1ILGy6dM',
              description: 'Binary search tree operations'
            }
          ],
          project: {
            title: 'Solve 20 Tree Problems',
            description: 'Master tree traversals and BST operations',
            coreFeatures: [
              'All tree traversals (recursive and iterative)',
              'Validate BST',
              'Lowest common ancestor',
              'Tree diameter calculation',
              'Serialize and deserialize tree'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode Tree Problems',
                url: 'https://leetcode.com/tag/tree/'
              }
            ]
          }
        },
        {
          week: 8,
          topics: [
            'Heaps and priority queues',
            'Heap operations: insert, delete, heapify',
            'Top K problems',
            'Median in data stream',
            'Merge K sorted lists/arrays'
          ],
          resources: [
            {
              type: 'video',
              title: 'Heaps Complete Tutorial',
              url: 'https://www.youtube.com/watch?v=HqPJF2L5h9U',
              description: 'Priority queues and heaps'
            },
            {
              type: 'video',
              title: 'Top K Problems Pattern',
              url: 'https://www.youtube.com/watch?v=tZVJWeZU8o4',
              description: 'Solve Top K problems'
            }
          ],
          project: {
            title: 'Solve 15 Heap Problems',
            description: 'Master heap and priority queue operations',
            coreFeatures: [
              'Kth largest element',
              'Top K frequent elements',
              'Merge K sorted lists',
              'Find median from data stream',
              'Task scheduler'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode Heap Problems',
                url: 'https://leetcode.com/tag/heap-priority-queue/'
              }
            ]
          }
        }
      ],
      skillsGained: [
        'Tree data structures mastery',
        'Heap and priority queue operations',
        'Recursive problem solving',
        'Tree traversal techniques',
        'Advanced pattern recognition'
      ]
    },
    {
      level: 4,
      title: 'Expert',
      goal: 'Master graph algorithms, dynamic programming, and advanced problem-solving. Prepare for competitive programming and top-tier interviews.',
      
      weeks: [
        {
          week: 9,
          topics: [
            'Graph representation: adjacency matrix, adjacency list',
            'BFS (Breadth-First Search)',
            'DFS (Depth-First Search)',
            'Cycle detection in graphs',
            'Topological sorting'
          ],
          resources: [
            {
              type: 'video',
              title: 'Graph Algorithms Complete Course',
              url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
              description: 'Complete graph theory'
            },
            {
              type: 'video',
              title: 'BFS and DFS Explained',
              url: 'https://www.youtube.com/watch?v=pcKY4hjDrxk',
              description: 'Graph traversal algorithms'
            }
          ],
          project: {
            title: 'Solve 20 Graph Problems',
            description: 'Master graph traversal and basic graph algorithms',
            coreFeatures: [
              'Number of islands',
              'Course schedule (topological sort)',
              'Clone graph',
              'Detect cycle in graph',
              'Connected components'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode Graph Problems',
                url: 'https://leetcode.com/tag/graph/'
              }
            ]
          }
        },
        {
          week: 10,
          topics: [
            'Shortest path algorithms: Dijkstra, Bellman-Ford',
            'Floyd-Warshall algorithm',
            'Minimum spanning tree: Prim\'s, Kruskal\'s',
            'Union-Find (Disjoint Set Union)',
            'Advanced graph problems'
          ],
          resources: [
            {
              type: 'video',
              title: 'Dijkstra\'s Algorithm',
              url: 'https://www.youtube.com/watch?v=pVfj6mxhdMw',
              description: 'Shortest path algorithm'
            },
            {
              type: 'video',
              title: 'Union-Find Explained',
              url: 'https://www.youtube.com/watch?v=ibjEGG7ylHk',
              description: 'Disjoint set union'
            }
          ],
          project: {
            title: 'Solve 15 Advanced Graph Problems',
            description: 'Master shortest path and MST algorithms',
            coreFeatures: [
              'Network delay time (Dijkstra)',
              'Cheapest flights (Bellman-Ford)',
              'Minimum spanning tree',
              'Number of provinces (Union-Find)',
              'Word ladder problem'
            ],
            resources: [
              {
                type: 'link',
                title: 'Advanced Graph Problems',
                url: 'https://leetcode.com/tag/graph/'
              }
            ]
          }
        },
        {
          week: 11,
          topics: [
            'Dynamic Programming introduction',
            '1D DP: Fibonacci, climbing stairs',
            '2D DP: grid problems, longest common subsequence',
            'Knapsack problems (0/1, unbounded)',
            'DP on strings and arrays'
          ],
          resources: [
            {
              type: 'video',
              title: 'Dynamic Programming Complete Course',
              url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
              description: 'Complete DP tutorial'
            },
            {
              type: 'video',
              title: 'DP Patterns',
              url: 'https://www.youtube.com/watch?v=aPQY__2H3tE',
              description: 'Common DP patterns'
            }
          ],
          project: {
            title: 'Solve 25 DP Problems',
            description: 'Master dynamic programming techniques',
            coreFeatures: [
              'Fibonacci and variations',
              'Longest increasing subsequence',
              '0/1 Knapsack',
              'Coin change problem',
              'Edit distance'
            ],
            resources: [
              {
                type: 'link',
                title: 'LeetCode DP Problems',
                url: 'https://leetcode.com/tag/dynamic-programming/'
              }
            ]
          }
        },
        {
          week: 12,
          topics: [
            'Advanced DP: DP on trees',
            'DP with bitmasks',
            'Matrix chain multiplication',
            'DP optimization techniques',
            'State space reduction'
          ],
          resources: [
            {
              type: 'video',
              title: 'Advanced DP Techniques',
              url: 'https://www.youtube.com/watch?v=YBSt1jYwVfU',
              description: 'Advanced DP patterns'
            }
          ],
          project: {
            title: 'Solve 20 Advanced DP Problems',
            description: 'Master advanced DP techniques',
            coreFeatures: [
              'House robber series',
              'Best time to buy/sell stock series',
              'Palindrome partitioning',
              'Word break problem',
              'Maximum profit in job scheduling'
            ],
            resources: [
              {
                type: 'link',
                title: 'Hard DP Problems',
                url: 'https://leetcode.com/problemset/all/?difficulty=HARD&topicSlugs=dynamic-programming'
              }
            ]
          }
        }
      ],
      skillsGained: [
        'Graph algorithms mastery',
        'Dynamic programming expertise',
        'Shortest path algorithms',
        'Advanced problem-solving',
        'Competitive programming readiness'
      ]
    }
  ],
  
  outcome: {
    projects: [
      '100+ LeetCode problems solved (Easy, Medium, Hard)',
      'GitHub repository with all solutions and explanations',
      'Participation in 2+ online coding contests',
      'Complete DSA interview preparation',
      'Portfolio showcasing problem-solving journey'
    ],
    
    submissionRequirements: {
      mandatory: [
        'GitHub repository with at least 100 solved problems',
        'LeetCode profile showing progress',
        'Weekly problem-solving tracker (Excel/Notion)',
        'Participation certificate from at least 2 contests'
      ],
      preferred: [
        'Blog posts explaining complex problems',
        'YouTube videos of problem walkthroughs',
        'Codeforces/CodeChef profile with active participation',
        'Contribution to open-source DSA libraries'
      ],
      linkedinPost: {
        required: true,
        shouldInclude: [
          'Your learning journey and transformation',
          'Key concepts mastered',
          'Number of problems solved',
          'GitHub repository link',
          'Contest participation highlights',
          'Tag @ACM_USICT and use #DSABootcamp #ACM #CompetitiveProgramming'
        ]
      }
    },
    
    certification: {
      title: 'DSA Bootcamp Certificate of Excellence',
      requirements: [
        'Complete all 4 levels',
        'Solve minimum 100 problems across all topics',
        'Participate in at least 2 coding contests',
        'Submit GitHub repository with organized solutions',
        'Maintain problem-solving tracker',
        'Present final portfolio showcase'
      ]
    }
  }
};
