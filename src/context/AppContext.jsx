import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

// Complete static portfolio data - EDIT THIS DIRECTLY
const portfolioData = {
  about: {
    name: "Shadman Yaser", // Change to your name
    title: "Your Title", // Change to your title
    description: "CSE student skilled in full stack development, with interests in Machine Learning and Image Processing. Passionate about building intuitive web apps and exploring data driven solutions.", // Change to your description
    image: "/assets/images/profile2.jpg", // Change to your photo path
    email: "shadmanyaser890@gmail.com", // Change to your email
    phone: "01622997885", // Change to your phone
    presentAddress: "Chattogram", // Change to your address
    hometown: "Chandpur", // Change to your hometown
    availability: "Anytime", // Change to your availability
    github: "https://github.com/samin124", // Change to your GitHub
    linkedin: "https://www.linkedin.com/in/shadman-yaser-909710244/", // Change to your LinkedIn
    resumeUrl: "/assets/images/ShadmanYaserCVv2.pdf" // Change to your resume URL
  },
  education: [
    {
      id: 1,
      degree: "B.Sc in Computer Science and Engineering", // Change to your degree
      institution: "International Islamic University Chittagong", // Change to your institution
      period: "2021 - 2025", // Change to your period
      location: "Chittagong,Bangladesh", // Change to location
      description: "Completed Bachelor of Science (B.Sc.) in Computer Science and Engineering, specializing in software development, artificial intelligence, and data driven technologies.", // Change to your description
      gpa: "3.56/4.0" // Change to your GPA
    },
    {
      id: 2,
      degree: "Higher Secondery Certificate", // Change to your degree
      institution: "Chittagong Govt. Model School and College", // Change to your institution
      period: "2019 - 2020", // Change to your period
      location: "Chittagong,Bangladesh", // Change to location
      description: "Completed Higher Secondary Certificate (HSC) in Science, with a strong foundation in mathematics, physics, and computer science fundamentals", // Change to your description
      gpa: "5.0/5.0" // Change to your GPA
    },
    {
      id: 3,
      degree: "Secondery School Certificate", // Change to your degree
      institution: "Bangladesh Railway Govt, High School", // Change to your institution
      period: "2016 - 2017", // Change to your period
      location: "Chittagong,Bangladesh", // Change to location
      description: "Completed Secondary School Certificate (SSC), building a strong academic foundation in science and mathematics.", // Change to your description
      gpa: "4.86/5.0" // Change to your GPA
    }
    // Add more education as needed
  ],
  projects: [
    {
      id: 1,
      title: "AstroAware", // Change to your project name
      description: "Designed and built an interactive impact simulator that turns live asteroid data into actionable insights.Integrated NASA NeoWs and Sentry APIs, the Wolfram Meteorite Landings dataset, and USGS hazard/population data to estimate impact energy, earthquake and tsunami effects, and map regional exposure (focused on Bangladesh). Implemented robust API integration and backend physics calculations, dynamic PDF briefing generation, and a real-time alert system that issues email notifications when an object becomes hazardous. On the frontend, created hover driven maps,risk rings, mitigation strategy guides and interactive learning features (quizzes, gallery and asteroid defense game) to increase public awareness and preparedness.", // Change to your project description
      image: "/public/assets/images/astroaware.jpg", // Change to your project image
      technologies: ["html", "Javascript", "Tailwind CSS","Node.JS"], // Change to your technologies
      liveUrl: "https://nasa-project-2025.onrender.com/", // Change to live demo URL
      githubUrl: "https://github.com/samin124/AstroAware-2025", // Change to GitHub URl
    },
    {
      id: 2,
      title: "Krishi.net",
      description: "A user-friendly farming platform designed for rural Bangladeshi users, built with Tailwind CSS for a responsive and intuitive interface. The platform provides accessible tools and information to support local farmers in managing their agricultural activities effectively.",
      image: "/public/assets/images/krishiImage.jpg",
      technologies: ["html", "CSS", "Tailwind CSS"],
      liveUrl: "https://samin124.github.io/krishi.net/",
      githubUrl: "https://github.com/samin124/krishi.net",
    },
    {
      id: 3,
      title: "Banana Ripeness Detection", // Change to your project name
      description: "Flask app allowing image upload and graph based visualization of banana classes", // Change to your project description
      image: "/public/assets/images/banana.jpg", // Change to your project image
      technologies: ["Python", "Flask", "Machine Learning"], // Change to your technologies
      liveUrl: "https://banana-ripeness-detection-2-tdt8.onrender.com/",
      githubUrl: "https://github.com/samin124/Banana-Ripeness-Detection",
    },
    {
      id: 4,
      title: "Check User", // Change to your project name
      description: "A Laravel-based web application featuring full CRUD functionality with user authentication, structured using the MVC architecture. The app includes routing for seamless navigation and uses MySQL for data storage, demonstrating secure and organized backend development.", // Change to your project description
      image: "/assets/images/laravel_crud.jpg", // Change to your project image
      technologies: ["PHP", "Laravel", "MySQL"], // Change to your technologies
      githubUrl: "https://github.com/samin124/Check-User", // Change to GitHub URL
    },
    {
      id: 5,
      title: "Call Center Data Analysis", // Change to your project name
      description: "A Power BI dashboard for call center analysis, visualizing key metrics such as call volume, response time, and customer satisfaction. The dashboard provides actionable insights through interactive charts and reports, enabling data-driven decision-making.", // Change to your project description
      image: "/assets/images/pwer1.jpg", // Change to your project image
      technologies: ["Power BI", "Microsoft Excel", "Data Cleaning"], // Change to your technologies
      githubUrl: "https://github.com/samin124/Call-Center-Data-Analysis", // Change to GitHub URL
    },
    {
      id: 6,
      title: "Ecommerce Sales Dashboard", // Change to your project name
      description: "An e-commerce sales dashboard that visualizes key business metrics such as revenue, orders, and product performance. Built to provide actionable insights through interactive charts and reports, helping businesses track and optimize their sales effectively.", // Change to your project description
      image: "/assets/images/power2.jpg", // Change to your project image
      technologies: ["Power BI", "Microsoft Excel", "Data Cleaning"], // Change to your technologies
      githubUrl: "https://github.com/samin124/Ecommerce-Sales-Data-Analysis", // Change to GitHub URL
    }
    // Ad
    // Add more projects as needed
 
  ],
  skills: [
    {
      name: "JavaScript (Basic)",
      category: "Frontend",
      icon: "https://img.icons8.com/color/96/000000/javascript.png",
      experience: "Beginner",
      description: "Core programming language for web development",
      features: [
        "Variables, Data Types & Operators",
        "Functions & Control Flow",
        "DOM Manipulation Basics",
        "Event Handling",
        "Integration with HTML/CSS"
      ]
    },
    {
      name: "Laravel & PHP",
      category: "Backend",
      icon: "https://img.icons8.com/fluency/96/000000/laravel.png",
      experience: "Intermediate",
      description: "PHP framework for building robust web applications",
      features: [
        "MVC Architecture",
        "Routing & Middleware",
        "Eloquent ORM & Database Interaction",
        "Authentication & Authorization",
        "Object-Oriented Programming (OOP)"
      ]
    },
    {
      name: "Machine Learning & Deep Learning",
      category: "AI/ML",
      icon: "https://img.icons8.com/color/96/000000/artificial-intelligence.png",
      experience: "Intermediate",
      description: "Building intelligent models to learn from data",
      features: [
        "Data Preprocessing & Feature Engineering",
        "Model Training & Evaluation",
        "Supervised & Unsupervised Learning",
        "Neural Networks & CNNs",
        "Image Classification & Object Detection"
      ]
    },
    {
      name: "Image Processing",
      category: "AI/ML",
      icon: "https://img.icons8.com/color/96/000000/image.png",
      experience: "Intermediate",
      description: "Techniques to analyze and manipulate images",
      features: [
        "Image Enhancement & Filtering",
        "Edge Detection & Contour Analysis",
        "Color Space Conversion",
        "Feature Extraction",
        "Integration with ML Models"
      ]
    },
    {
      name: "Data Structures & Algorithms",
      category: "Programming",
      icon: "https://img.icons8.com/color/96/000000/data-configuration.png",
      experience: "Intermediate",
      description: "Core concepts for efficient problem-solving and coding",
      features: [
        "Arrays, Linked Lists, Stacks, Queues",
        "Trees & Graphs",
        "Sorting & Searching Algorithms",
        "Time & Space Complexity Analysis"
      ]
    },
    {
      name: "Software Engineering",
      category: "Programming",
      icon: "https://img.icons8.com/color/96/000000/source-code.png",
      experience: "Intermediate",
      description: "Principles and practices for developing high-quality software",
      features: [
        "Software Development Life Cycle (SDLC)",
        "Requirement Analysis & Design",
        "Version Control & Documentation",
        "Testing & Debugging"
      ]
    },
    {
      name: "Databases",
      category: "Programming",
      icon: "https://img.icons8.com/color/96/000000/database.png",
      experience: "Intermediate",
      description: "Designing and managing data storage systems",
      features: [
        "SQL & Relational Databases (MySQL, MariaDB)",
        "Database Design & Normalization",
        "CRUD Operations & Queries",
        "Basic NoSQL Concepts"
      ]
    },
    {
      name: "Power BI",
      category: "Data Analytics",
      icon: "https://img.icons8.com/color/96/000000/power-bi.png",
      experience: "Beginner",
      description: "Data visualization and business intelligence tool",
      features: [
        "Interactive Dashboards",
        "Data Modeling & Transformation",
        "Reports & Visual Analytics",
        "Integration with Databases & Excel"
      ]
    }
  ],
  experience: [
    {
      id: 1,
      position: "Teaching Assistant", // Change to your position
      company: "International Islamic University Chittagong", // Change to company name
      period: "July 2023 - December 2023", // Change to your period
      location: "Chittagong", // Change to location
      description: " Assisted students in conducting lab experiments and understanding core concepts of electrical and electronics engineering.Provided support in troubleshooting circuit designs and using lab equipment effectively. Helped reinforce theoretical knowledge through practical application.", // Change to your description
      technologies: ["Oscilloscopes", "Multimeters", "Circuit Simulation Software", "Breadboards", "Power Supplies"]
      // Change to technologies used
    }
    // Add more experience as needed
  ],
  research: {
    interests: [
      "Machine Learning & Artificial Intelligence",
      "Natural Language Processing", 
      "Computer Vision",
      "Human-Computer Interaction",
      "Data Science & Analytics"
    ],
    description: "My research focuses on developing innovative AI solutions that bridge the gap between theoretical machine learning and practical applications. I'm particularly interested in creating efficient models that can operate in resource-constrained environments while maintaining high performance.",
    profileLinks: {
      googleScholar: "https://scholar.google.com/citations?user=YOUR_ID",
      researchGate: "https://www.researchgate.net/profile/YOUR_NAME",
      ORCID: "https://orcid.org/0000-0000-0000-0000",
      arXiv: "https://arxiv.org/a/YOUR_NAME"
    }
  },
  competitions: [
    {
      id: 1,
      title: "Hult Prize at IIUC 2024–25 On Campus Program", // Change to competition name
      description: "Secured 1st Runner-up position in the prestigious Hult Prize on-campus program, competing with innovative social entrepreneurship solutions that address global challenges. Demonstrated exceptional problem-solving skills and business acumen in one of the world's largest student competitions for social good.", // Change to description
      organizer: "International Islamic University Chittagong", // Change to organizer
      position: "2nd Place", // Change to your position
      certificateUrl:"https://drive.google.com/file/d/1SOvT79s5bw1Digsfc3IqjcqfR-p_7gLX/view", // Change to certificate URL
      image: "/public/assets/images/hult3.jpg" // Change to image
    },
    {
      id: 2,
      title: "Onsite Project Showcase",
      description: "Selected as a finalist in the competitive onsite project showcase, presenting innovative technical solutions to industry experts. Showcased practical implementation skills and project development capabilities in a professional academic environment.",
      organizer: "AUST Innovation and Design Club.",
      position: "Final Round",
      certificateUrl: "https://drive.google.com/file/d/1-nA3NPCFnSIWodLljbi_C8c06-yFgJxC/view",
      image: "/public/assets/images/aust.jpg"
    },
    {
      id: 3,
      title: "AI ENGINEERING HACKATHON 2025",
      description: "Participated in a competitive AI Engineering Hackathon organized by leading tech companies, collaborating on cutting-edge artificial intelligence solutions. Gained hands-on experience in AI development and problem-solving within tight deadlines",
      organizer: "Brain Station23 and Poridhi.io.",
      position: "Participant",
      certificateUrl: "https://drive.google.com/file/d/1V2VEp5PjvtYGv2sgP6JWa0MAYunie60d/view",
      image: "/public/assets/images/brainHack.jpeg"
    },
    {
      id: 4,
      title: " Hackathon segment ",
      description: "Recognized for outstanding contribution and innovative approach in the hackathon segment of Chittagong Science Carnival. Demonstrated technical expertise and creative problem-solving abilities in a competitive science and technology festival.",
      organizer: " Chittagong Science Carnival 4.0 (CUSS)",
      position: "Final Round",
      certificateUrl: "https://drive.google.com/file/d/1blzHQRx7LXUj3fEEgpZmB2HTpe6XyOTW/view",
      image: "/public/assets/images/cu.jpg"
    }
    // Add more competitions as needed
  ],
  courses: [
    {
      id: 1,
      title: "PHP (Laravel)", // Change to course name
      platform: "Dept. of CSE, CUET under EDGE Project (BCC, ICT Division)", // Change to platform
      type: "Professional", // Change type
      description: "This intensive, industry-focused training provided a comprehensive foundation in modern web development using the Laravel PHP framework. The curriculum equipped me with practical, hands-on skills in core Laravel concepts, including the Model-View-Controller (MVC) architecture for organized code structure, Eloquent ORM for efficient database interaction, and routing with controllers to manage application logic. I gained experience in building dynamic user interfaces with the Blade templating engine, managing database schemas through migrations and seeding, and implementing secure form handling with robust server-side validation. Furthermore, the training covered essential features like basic user authentication for registration and login systems. The program's goal was to align with industry standards set by partners like HP, equipping me with the necessary skills to build secure, scalable, and maintainable web applications.", // Change description
      fullDescription: "This intensive, industry-focused training provided a comprehensive foundation in modern web development using the Laravel PHP framework. The curriculum equipped me with practical, hands-on skills in core Laravel concepts, including the Model-View-Controller (MVC) architecture for organized code structure, Eloquent ORM for efficient database interaction, and routing with controllers to manage application logic. I gained experience in building dynamic user interfaces with the Blade templating engine, managing database schemas through migrations and seeding, and implementing secure form handling with robust server-side validation. Furthermore, the training covered essential features like basic user authentication for registration and login systems. The program's goal was to align with industry standards set by partners like HP, equipping me with the necessary skills to build secure, scalable, and maintainable web applications.", // Change full description
      duration: "4 months", // Change duration
      completionDate: "December 2024", // Change completion date
      instructor: "Md. Saiful Islam", // Change instructor
      certificateImage: "https://drive.google.com/file/d/1Tix320B-OBPffgRI6kY0GlkYyJJTDVm_/view", // Change certificate image
      certificateUrl: "https://drive.google.com/file/d/1nWIDxPSXrN_O3VB0Tj0IDUrABTK8ntd0/view", // Change certificate URL
      skills: ["PHP", "Laravel", "OOP", "Database"], // Change skills learned
    },
    {
      id: 2,
      title: "Data Analyst with SQL & Python",
      platform: "Farhan's Academy",
      type: "Professional",
      description: "As a certified Data Analyst, I have successfully completed intensive training in leveraging SQL and Python to transform raw data into actionable insights. My skill set encompasses the entire data analysis pipeline, from extracting and manipulating large datasets with complex SQL queries to performing advanced data cleaning, statistical analysis, and visualization using Python libraries like Pandas, NumPy, and Matplotlib. This rigorous course has equipped me with the practical expertise to uncover trends, build reports, and support data-driven decision-making, providing a strong foundation for tackling real-world analytical challenges.",
      fullDescription: "As a certified Data Analyst, I have successfully completed intensive training in leveraging SQL and Python to transform raw data into actionable insights. My skill set encompasses the entire data analysis pipeline, from extracting and manipulating large datasets with complex SQL queries to performing advanced data cleaning, statistical analysis, and visualization using Python libraries like Pandas, NumPy, and Matplotlib. This rigorous course has equipped me with the practical expertise to uncover trends, build reports, and support data-driven decision-making, providing a strong foundation for tackling real-world analytical challenges.",
      duration: "2 months",
      completionDate: "January 2025",
      instructor: "Farhan's Academy",
      certificateImage: "https://drive.google.com/file/d/1Tix320B-OBPffgRI6kY0GlkYyJJTDVm_/view",
      certificateUrl: "https://drive.google.com/file/d/1Tix320B-OBPffgRI6kY0GlkYyJJTDVm_/view",
      skills: ["Data Analysis", "Data Visualization","Data Cleaning"]
    },
    {
      id: 3,
      title: "12-Hour App Development Crash Course",
      platform: "IIUC Student Branch Society",
      type: "Professional",
      description: "I solidified my foundation in cross-platform mobile development by completing a focused 12-Hour App Development Crash Course at IIUC SBC. This intensive program provided hands-on experience with the Flutter framework, where I learned to build dynamic and responsive user interfaces with the Dart programming language. The course covered essential concepts such as widget-based development, state management, and UI design, equipping me with the practical skills to rapidly prototype and develop functional mobile applications.",
      fullDescription: "I solidified my foundation in cross-platform mobile development by completing a focused 12-Hour App Development Crash Course at IIUC SBC. This intensive program provided hands-on experience with the Flutter framework, where I learned to build dynamic and responsive user interfaces with the Dart programming language. The course covered essential concepts such as widget-based development, state management, and UI design, equipping me with the practical skills to rapidly prototype and develop functional mobile applications..",
      duration: "12 hrs",
      completionDate: "March 2025",
      instructor: "IIUC Student Branch Society",
      certificateImage: "https://drive.google.com/file/d/1wYo0cJBlMxsgQoib28WGgVPxpdYBurIG/view",
      certificateUrl: "https://drive.google.com/file/d/1wYo0cJBlMxsgQoib28WGgVPxpdYBurIG/view",
      skills: ["Mobile App Development (Cross-platform)", "Flutter Framework"]
    }
    // Add more courses as needed
  ],
  contact: {
    email: "shadmanyaser890@gmail.com", // Change to your email
    phone: "01622997885", // Change to your phone
    location: "Chattogram, Bangladesh" // Change to your location
  }
}

const initialState = {
  user: null,
  portfolioData: portfolioData, // Direct static data - no localStorage
  loading: false,
  error: null
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}