class HTMLTutorialApp {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light"
    this.isMobile = window.innerWidth <= 768
    this.sidebarOpen = false

    this.init()
  }

  init() {
    this.setupTheme()
    this.setupEventListeners()
    this.setupNavigation()
    this.setupContent()
    this.handleResize()
  }

  setupTheme() {
    document.documentElement.setAttribute("data-theme", this.currentTheme)
    this.updateThemeIcon()
  }

  updateThemeIcon() {
    const themeToggle = document.getElementById("themeToggle")
    const icon = themeToggle.querySelector("i")

    if (this.currentTheme === "dark") {
      icon.className = "fas fa-sun"
    } else {
      icon.className = "fas fa-moon"
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", this.currentTheme)
    localStorage.setItem("theme", this.currentTheme)
    this.updateThemeIcon()
  }

  setupEventListeners() {
    // Theme toggle
    document.getElementById("themeToggle").addEventListener("click", () => {
      this.toggleTheme()
    })

    // Mobile menu toggle
    document.getElementById("mobileMenuToggle").addEventListener("click", () => {
      this.toggleMobileMenu()
    })

    // Overlay click
    document.getElementById("overlay").addEventListener("click", () => {
      this.closeMobileMenu()
    })

    // Window resize
    window.addEventListener("resize", () => {
      this.handleResize()
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.sidebarOpen) {
        this.closeMobileMenu()
      }
    })
  }

  setupNavigation() {
    // Section headers (collapsible)
    const sectionHeaders = document.querySelectorAll(".nav-section-header")
    sectionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        this.toggleSection(header)
      })
    })

    // Navigation links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        this.handleNavClick(link)
      })
    })
  }

  toggleSection(header) {
    const section = header.getAttribute("data-section")
    const content = document.getElementById(section)
    const isExpanded = header.getAttribute("aria-expanded") === "true"

    // Close all other sections
    document.querySelectorAll(".nav-section-header").forEach((h) => {
      if (h !== header) {
        h.setAttribute("aria-expanded", "false")
        const otherSection = h.getAttribute("data-section")
        const otherContent = document.getElementById(otherSection)
        otherContent.classList.remove("expanded")
      }
    })

    // Toggle current section
    header.setAttribute("aria-expanded", !isExpanded)
    content.classList.toggle("expanded", !isExpanded)
  }

  handleNavClick(clickedLink) {
    // Remove active class from all links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })

    // Add active class to clicked link
    clickedLink.classList.add("active")

    // Get content key
    const contentKey = clickedLink.getAttribute("data-content")

    // Load content
    this.loadContent(contentKey)

    // Close mobile menu if open
    if (this.isMobile && this.sidebarOpen) {
      this.closeMobileMenu()
    }
  }

  toggleMobileMenu() {
    const sidebar = document.getElementById("sidebar")
    const overlay = document.getElementById("overlay")
    const toggle = document.getElementById("mobileMenuToggle")

    this.sidebarOpen = !this.sidebarOpen

    sidebar.classList.toggle("active", this.sidebarOpen)
    overlay.classList.toggle("active", this.sidebarOpen)
    toggle.classList.toggle("active", this.sidebarOpen)

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.sidebarOpen ? "hidden" : ""
  }

  closeMobileMenu() {
    if (this.sidebarOpen) {
      this.toggleMobileMenu()
    }
  }

  handleResize() {
    const wasMobile = this.isMobile
    this.isMobile = window.innerWidth <= 768

    // Close mobile menu when switching to desktop
    if (wasMobile && !this.isMobile && this.sidebarOpen) {
      this.closeMobileMenu()
    }
  }

  setupContent() {
    // Initialize with first content
    this.loadContent("html-introduction")
  }

  loadContent(contentKey) {
    const content = this.getContentData(contentKey)
    const contentElement = document.getElementById("dynamic-content")

    contentElement.innerHTML = `
            <header class="content-header">
                <h1>${content.title}</h1>
                <div class="content-meta">
                    <span class="reading-time">
                        <i class="fas fa-clock"></i>
                        ${content.readingTime}
                    </span>
                    <span class="difficulty">
                        <i class="fas fa-signal"></i>
                        ${content.difficulty}
                    </span>
                </div>
            </header>
            
            <div class="content-body">
                ${content.body}
            </div>
        `

    // Smooth scroll to top of content
    contentElement.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  getContentData(key) {
    const contentMap = {
      "html-introduction": {
        title: "HTML Introduction",
        readingTime: "5 min read",
        difficulty: "Beginner",
        body: `
                    <p>HTML (HyperText Markup Language) হলো একটি মার্কআপ ভাষা যা ওয়েবপেজ তৈরির জন্য ব্যবহৃত হয়।</p>
                <p>"Hypertext" অর্থ এক পৃষ্ঠার সাথে অন্য পৃষ্ঠার সংযোগ এবং "Markup language" অর্থ হলো একটি ট্যাগ-ভিত্তিক ভাষা।</p>
                <ul>
                    <li>HTML ডকুমেন্ট <code>&lt;!DOCTYPE html&gt;</code> দিয়ে শুরু হয়।</li>
                    <li>মূল গঠন হয় <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, এবং <code>&lt;body&gt;</code> দিয়ে।</li>
                    <li>HTML ব্রাউজারে রান হয় এবং উপাদানগুলো দৃশ্যমান করে।</li>
                </ul><br><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;"> What is HTML?</p>
                <p>HTML (HyperText Markup Language) ১৯৯১ সালে Tim Berners-Lee দ্বারা তৈরি করা হয়েছিল। এটি একটি markup language যা ওয়েব পেজ তৈরি করতে ব্যবহৃত হয়, headings, paragraphs, links, and images মতো উপাদানগুলি সংজ্ঞায়িত করা। HTML ওয়েব সামগ্রীর ব্যাকবোন গঠন করে। HTML হলো ওয়েবসাইটের কঙ্কালের মতো। এটি নির্দেশাবলীর একটি সেট যা একটি ওয়েব ব্রাউজারকে কীভাবে ওয়েবপৃষ্ঠায় text, images, videos, and other elements উপাদানগুলি প্রদর্শন করতে হবে তা বলে। এটিকে বিল্ডিং ব্লক হিসাবে ভাবেন যা কোনও ওয়েবসাইটের কাঠামো এবং চেহারা তৈরি করে, যেমন একটি ঘর তৈরি করতে ইট এবং মর্টার কীভাবে ব্যবহৃত হয় তার অনুরূপ।</p><br>
                <p style="font-weight: bold; font-size: 20px;  ">In a nutshell:</p>
                <ul>
                    <li>HTML হল ওয়েবের ভাষা, যা ওয়েবসাইট তৈরিতে ব্যবহৃত হয়।</li>
                    <li>HTML ইন্টারনেটে আমরা যে ওয়েব পৃষ্ঠাগুলি দেখি তার কাঠামো বা বিন্যাসকে সংজ্ঞায়িত করে।</li>
                    <li>HTML একটি HTML ডকুমেন্টের মধ্যে থাকা tag নিয়ে গঠিত একটি সেট, এবং সংশ্লিষ্ট ফাইলগুলিতে সাধারণত .html অথবা .htm এক্সটেনশন থাকে।</li>
                    <li>HTML এর বেশ কয়েকটি সংস্করণ রয়েছে, যার মধ্যে HTML5 হল সবচেয়ে সাম্প্রতিক সংস্করণ।</li>
                </ul><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Features of HTML:</p>
                <ul>
                    <li>এটি প্ল্যাটফর্ম-স্বাধীন। উদাহরণস্বরূপ, Chrome বিভিন্ন অপারেটিং সিস্টেম যেমন Mac, Linux এবং Windows জুড়ে একই পৃষ্ঠাগুলি একইভাবে প্রদর্শন করে।</li>
                    <li>ছবি, ভিডিও এবং অডিও একটি ওয়েব পৃষ্ঠায় যোগ করা যেতে পারে (উদাহরণস্বরূপ - YouTube তাদের ওয়েবসাইটে ভিডিও দেখায়)।</li>
                    <li>HTML একটি মার্কআপ ভাষা, কোনও প্রোগ্রামিং ভাষা নয়।</li>
                    <li>এটি CSS, JavaScript ইত্যাদির মতো অন্যান্য ভাষার সাথে একত্রিত করে ইন্টারেক্টিভ (বা গতিশীল) ওয়েব পৃষ্ঠাগুলি দেখানো যেতে পারে।</li>
                </ul><br>
                <p style="font-weight: bold; font-size: 30px;  ">Why the Term HyperText & Markup Language?</p>
                <p>'Hypertext Markup Language' শব্দটি দুটি প্রধান শব্দের সমন্বয়ে গঠিত: 'Hypertext' এবং 'Markup Language'। 'Hypertext' বলতে অন্যান্য নথির সাথে টেক্সটের সংযোগ বোঝায়, যেখানে 'Markup Language' বলতে এমন একটি ভাষা বোঝায় যা নির্দিষ্ট ট্যাগ ব্যবহার করে।</p>
            ` 
      },
      "html-working": {
        title: "How HTML Works",
        readingTime: "7 min read",
        difficulty: "Beginner",
        body: `
                    <p>তুমি নিশ্চয়ই ফ্রন্টএন্ড এবং ব্যাকএন্ডের কথা শুনেছো। ফ্রন্টএন্ড বলতে কোনও ওয়েবসাইট বা অ্যাপের দৃশ্যমান অংশ বোঝায় যার সাথে ব্যবহারকারীরা ইন্টারঅ্যাক্ট করে, যেমন টেবিল, ছবি এবং বোতাম। এটি HTML, CSS এবং জাভাস্ক্রিপ্টের মতো ভাষা ব্যবহার করে তৈরি করা হয়েছে। অন্যদিকে, ব্যাকএন্ড পর্দার পিছনের কাজগুলি পরিচালনা করে যেমন ব্যবহারকারীরা ফ্রন্টএন্ডের সাথে ইন্টারঅ্যাক্ট করার সময় ডেটা সংরক্ষণ এবং প্রক্রিয়াকরণ। এটি পাইথন, রুবি এবং জাভার মতো ভাষা ব্যবহার করে। মূলত, ফ্রন্টএন্ড হল ব্যবহারকারীরা যা দেখে, অন্যদিকে ব্যাকএন্ড কার্যকারিতা পরিচালনা করে।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">How do websites work?</p>
                <p>ওয়েবসাইটগুলি কাজ করে ক্লায়েন্ট-সার্ভার মডেলের মাধ্যমে। যখন আপনি একটি ওয়েব পৃষ্ঠা খুলেন, তখন আপনার ব্রাউজার (ক্লায়েন্ট) সার্ভারে একটি অনুরোধ পাঠায়। সার্ভারটি সেই অনুরোধটি প্রক্রিয়া করে এবং প্রয়োজনীয় তথ্য সহ একটি প্রতিক্রিয়া পাঠায়। ব্রাউজারটি সেই প্রতিক্রিয়া গ্রহণ করে এবং এটি একটি দৃশ্যমান পৃষ্ঠায় রূপান্তরিত করে।</p><br>
                <p>যখন আমরা ইন্টারনেটে কোন তথ্য অ্যাক্সেস করতে চাই, তখন আমরা একটি ওয়েব ব্রাউজার ব্যবহার করে এটি অনুসন্ধান করি। ওয়েব ব্রাউজার ওয়েব সার্ভার থেকে বিষয়বস্তু পুনরুদ্ধার করে, যেখানে এটি HTML ডকুমেন্ট আকারে সংরক্ষণ করা হয়।</p><br><br>
                <p>আপনার পছন্দের কোড এডিটরে নির্দিষ্ট ট্যাগ সহ কোড লিখে একটি HTML ডকুমেন্ট তৈরি করা হয়। এরপর ডকুমেন্টটি '.html' এক্সটেনশন দিয়ে সংরক্ষণ করা হয়। সংরক্ষণের পরে, ব্রাউজার HTML ডকুমেন্টটি ব্যাখ্যা করে, পড়ে এবং ওয়েব পৃষ্ঠাটি রেন্ডার করে।</p><br><br>
                <img src="/asset/how html homeworks.png" alt="How HTML Works" style="width: 100%; height: auto; border-radius: 8px;">
                <p style="font-weight: bold; font-size: 30px;  ">What is a Web Browser?</p>
                <p>ওয়েব ব্রাউজার হল এমন একটি প্রোগ্রাম যা HTML ট্যাগগুলি বোঝে এবং সেগুলিকে এমনভাবে রেন্ডার করে যা মানুষের পঠনযোগ্য ফর্ম্যাটে তৈরি করা হয় যা ওয়েবসাইট পরিদর্শনকারীরা সহজেই দেখতে পাবে। ডেভেলপাররা HTML-এ কোড লেখেন কারণ এটি ওয়েব ব্রাউজারকে কী প্রদর্শন করতে হবে তা নির্দেশ করার একটি সহজ উপায়। পরবর্তী বিভাগে, আমি আপনাকে দেখাবো কিভাবে আপনার নিজস্ব HTML কোড লেখার জন্য এবং ওয়েব ব্রাউজারে এটি রেন্ডার করার জন্য VSCode সেট আপ করবেন।</p><br><br>
                <p style="font-weight: bold; font-size: 30px;  ">What is a Web Server?</p>
                <p>ওয়েব সার্ভার হল একটি সফ্টওয়্যার অ্যাপ্লিকেশন যা ওয়েব পৃষ্ঠাগুলি এবং অন্যান্য সামগ্রী সংরক্ষণ করে এবং ক্লায়েন্টদের অনুরোধের ভিত্তিতে তাদের বিতরণ করে। এটি HTTP (হাইপারটেক্সট ট্রান্সফার প্রোটোকল) ব্যবহার করে ক্লায়েন্টদের সাথে যোগাযোগ করে। যখন আপনি একটি URL টাইপ করেন বা একটি লিঙ্কে ক্লিক করেন, তখন আপনার ব্রাউজার সার্ভারে একটি অনুরোধ পাঠায়, এবং সার্ভারটি সেই অনুরোধের ভিত্তিতে HTML ডকুমেন্ট বা অন্যান্য ফাইলগুলি ফেরত পাঠায়।</p><br>
                <p style="font-weight: bold; font-size: 30px;  ">How does a Web Browser work?</p>
                <p>ওয়েব ব্রাউজার হল একটি সফ্টওয়্যার অ্যাপ্লিকেশন যা HTML ডকুমেন্টগুলি রেন্ডার করে এবং ব্যবহারকারীদের জন্য একটি ইন্টারফেস প্রদান করে। এটি ব্যবহারকারীর ইনপুট গ্রহণ করে এবং সার্ভারে অনুরোধ পাঠায়, তারপর সার্ভার থেকে প্রাপ্ত তথ্য প্রদর্শন করে।</p><br><br>
                <p style="font-weight: bold; font-size: 30px;  ">What is an HTML Document?</p>
                <p>একটি HTML ডকুমেন্ট হল '.html' বা '.htm' এক্সটেনশন দিয়ে সংরক্ষিত একটি টেক্সট ডকুমেন্ট, যাতে '< >'-এ আবদ্ধ টেক্সট এবং নির্দিষ্ট ট্যাগ থাকে। এই ট্যাগগুলি ওয়েব পৃষ্ঠা কনফিগার করার জন্য প্রয়োজনীয় নির্দেশাবলী প্রদান করে। ট্যাগগুলি নিজেই মানসম্মত এবং স্থির। একটি HTML ডকুমেন্টের গঠন এই HTML টিউটোরিয়ালে পরে ব্যাখ্যা করা হবে।</p> <br><br>
                <p style="font-weight: bold; font-size: 30px;  ">How does a Web Server work?</p>
                <p>ওয়েব সার্ভার হল একটি সফ্টওয়্যার অ্যাপ্লিকেশন যা HTTP (হাইপারটেক্সট ট্রান্সফার প্রোটোকল) ব্যবহার করে ক্লায়েন্টদের অনুরোধ গ্রহণ করে এবং প্রক্রিয়া করে। যখন একটি ক্লায়েন্ট একটি অনুরোধ পাঠায়, সার্ভারটি সেই অনুরোধটি বিশ্লেষণ করে এবং প্রয়োজনীয় তথ্য সহ একটি প্রতিক্রিয়া তৈরি করে। সার্ভারটি তারপর সেই প্রতিক্রিয়া ক্লায়েন্টের কাছে পাঠায়, যা সাধারণত একটি ওয়েব ব্রাউজার।</p>

                `,
      },

      
      "html-installation": {
        title: "HTML Installation & Setup",
        readingTime: "4 min read",
        difficulty: "Beginner",
        body: `
                   <p>আসুন আমরা হাত নোংরা করি এবং কিছু কোড লেখার প্রস্তুতি শুরু করি। এই টিউটোরিয়ালে, আমরা দ্রুত এবং আরও দক্ষ HTML ডেভেলপমেন্টের জন্য VSCode এবং কিছু সম্পর্কিত এক্সটেনশন ইনস্টল করব।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What are the prerequisites to learning HTML?</p><br>
                <p>আমি নিশ্চিতভাবে বলতে পারি যে HTML শেখার জন্য কোনও পূর্বশর্ত নেই। HTML হল ওয়েবের ভাষা এবং প্রায়শই ওয়েব ডেভেলপাররা কোড শেখার প্রথম পদক্ষেপ।</p><br><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Tools needed to make an HTML page:</p>
                <ul>
                    <li><strong><b> HTML Editor:</b></strong> এটি একটি সহজবোধ্য টুল যেখানে প্রতিটি HTML কন্টেন্ট লিখতে হবে। আপনি আপনার পছন্দের যেকোনো টেক্সট এডিটর ব্যবহার করতে পারেন। এই টিউটোরিয়ালে, আমরা ভিজ্যুয়াল স্টুডিও কোড ব্যবহার করছি কারণ এটি হালকা এবং ওপেন-সোর্স।</li><br>
                    <p>HTML ডেভেলপমেন্টের জন্য জনপ্রিয় এডিটরগুলির মধ্যে রয়েছে Notepad++ এবং TextEdit এর মতো টেক্সট এডিটর, Sublime Text এবং Visual Studio Code এর মতো কোড এডিটর এবং WebStorm এবং Eclipse এর মতো পূর্ণাঙ্গ IDE। CodePen এবং JSFiddle এর মতো অনলাইন প্ল্যাটফর্মগুলিও সাধারণত দ্রুত HTML এডিটিং এবং পরীক্ষার জন্য ব্যবহৃত হয়।</p><br>
                    <p><b style=" "> Note:</b> You can write HTML even in a Notepad. Text editors like VS Code make these things easier.</p><br>
                    <li><strong>Web Browser:</strong> আপনার HTML পেজগুলি পরীক্ষা করার জন্য একটি ওয়েব ব্রাউজার প্রয়োজন হবে। Google Chrome, Firefox, Safari, Brave ইত্যাদি জনপ্রিয় ব্রাউজার।</li>
                </ul>
                `,
      },
      "html-execution": {
        title: "HTML Execution - Your First Webpage",
        readingTime: "6 min read",
        difficulty: "Beginner",
        body: `
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 25px;  ">Your Journey to Creating Your First Website Begins Here!</p><br>
                <p>আসুন এটিকে একটি গুরুত্বপূর্ণ মাইলফলক হিসেবে গড়ে তুলি: আপনার প্রথম ওয়েবসাইট তৈরি! আর ঐতিহ্যবাহী "Hello World!" দিয়ে শুরু করার চেয়ে ভালো উপায় আর কী হতে পারে?</p><br><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 25px;  ">Why "Hello, World!"?</p><br>
                <p>কারণ এটি একটি সহজ এবং পরিচিত উদাহরণ যা নতুন প্রোগ্রামারদের জন্য একটি ভিত্তি তৈরি করে। "Hello, World!" প্রোগ্রামটি সাধারণত নতুন ভাষা শেখার সময় প্রথম প্রোগ্রাম হিসেবে লেখা হয়। এটি ভাষার মৌলিক সিনট্যাক্স এবং কাঠামো বোঝার জন্য একটি দুর্দান্ত উপায়।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 25px;  ">Let's Create Your First HTML Page!</p><br>
                <p>আপনি যদি এখনও VSCode ইনস্টল না করে থাকেন, তাহলে প্রথমে সেটি ইনস্টল করুন। VSCode ইনস্টল করার পর, নিচের ধাপগুলো অনুসরণ করুন:</p><br>
                <ol>
                    <li>VSCode খুলুন এবং একটি নতুন ফাইল তৈরি করুন।</li>
                    <li>ফাইলটি <code>index.html</code> নামে সংরক্ষণ করুন।</li>
                    <li>নিচের কোডটি কপি করে আপনার <code>index.html</code> ফাইলে পেস্ট করুন:</li><br>
                    <img src="./asset/Hello World!.png" alt="Hello World Code" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                    <li>ফাইলটি সংরক্ষণ করুন।</li>
                    <li>আপনার ফাইলটি ব্রাউজারে খুলুন। আপনি এটি VSCode থেকে সরাসরি করতে পারেন। ফাইলটি খুলতে, ফাইলের উপর রাইট ক্লিক করুন এবং "Open with Live Server" নির্বাচন করুন।</li>
                    <li>আপনি যদি Live Server এক্সটেনশন ইনস্টল না করে থাকেন, তাহলে প্রথমে সেটি ইনস্টল করুন। Live Server ইনস্টল করার পর, আপনার ফাইলটি আবার খুলুন।</li>
                </ol>
                `,
      },
      "html-structure": {
        title: "HTML Page Structure",
        readingTime: "8 min read",
        difficulty: "Beginner",
        body: `
                    <p>একটি HTML ডকুমেন্ট নেস্টেড ট্যাগের একটি সেট ব্যবহার করে গঠন করা হয়। প্রতিটি ট্যাগ <...> কোণ বন্ধনীর মধ্যে আবদ্ধ থাকে এবং কন্টেন্ট বা অন্যান্য HTML ট্যাগের জন্য একটি ধারক হিসেবে কাজ করে। আসুন একটি মৌলিক HTML ডকুমেন্ট কাঠামো দেখে নেওয়া যাক:</p><br>
                <img src="./asset/content.png" alt="HTML Page Structure" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">A typical HTML page looks like this:</p><br>
                <img src="./asset/page title.png" alt="HTML Page Structure Example" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>Note: These are the essential elements for a basic HTML document:&lt;!DOCTYPE html&gt;, &lt;html&gt;, &lt;head&gt;, &lt;title&gt;, &lt;body&gt; and more tags</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">DOCTYPE Declaration:</p><br>
                <img src="./asset/doctype.png" alt="DOCTYPE Declaration" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;!DOCTYPE html&gt; ঘোষণা ওয়েব ব্রাউজারকে HTML সংস্করণটি ব্যবহার করার বিষয়ে অবহিত করে। সর্বশেষ সংস্করণটি হল HTML5। কিন্তু যদি ভবিষ্যতে এটি পরিবর্তিত হয় (হয়তো ১০ বছর পরে), তাহলে ডক্টাইপ ঘোষণাটি সহায়ক হবে!</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">HTML root Element:</p><br>
                <img src="./asset/root element.png" alt="HTML Root Element" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;html&gt; ট্যাগ HTML ডকুমেন্টের মূল উপাদান। এটি সমস্ত HTML উপাদানগুলিকে ধারণ করে এবং ব্রাউজারকে জানায় যে এটি একটি HTML ডকুমেন্ট।</p><br>
                <img src="./asset/root close.png" alt="HTML Tag" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;/html&gt; ট্যাগ HTML ডকুমেন্টের সমাপ্তি নির্দেশ করে। এটি ব্রাউজারকে জানায় যে HTML ডকুমেন্টের শেষ হয়েছে।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Head Element:</p><br>
                <img src="./asset/head.png" alt="Head Element" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;head&gt; ট্যাগ HTML ডকুমেন্টের মাথের অংশ। এটি মেটাডেটা, শিরোনাম, স্টাইলশীট এবং স্ক্রিপ্টের মতো তথ্য ধারণ করে যা ডকুমেন্টের বিষয়বস্তু নয়।</p><br>
                <img src="./asset/close head.png" alt="Head Close Tag" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;/head&gt; ট্যাগ HTML ডকুমেন্টের মাথের অংশের সমাপ্তি নির্দেশ করে। এটি ব্রাউজারকে জানায় যে মাথার অংশ শেষ হয়েছে।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Title Element:</p><br>
                <img src="./asset/title.png" alt="Title Element" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;title&gt; ট্যাগ HTML ডকুমেন্টের শিরোনাম। এটি ব্রাউজারের ট্যাব বা উইন্ডোতে প্রদর্শিত হয় এবং সার্চ ইঞ্জিনে ওয়েব পৃষ্ঠার শিরোনাম হিসেবে ব্যবহৃত হয়।</p><br>
                <img src="./asset/title close.png" alt="Title Close Tag" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;/title&gt; ট্যাগ HTML ডকুমেন্টের শিরোনামের সমাপ্তি নির্দেশ করে। এটি ব্রাউজারকে জানায় যে শিরোনাম শেষ হয়েছে।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Body Element:</p><br>
                <img src="./asset/body.png" alt="Body Element" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;body&gt; ট্যাগ HTML ডকুমেন্টের মূল বিষয়বস্তু। এটি ওয়েব পৃষ্ঠার দৃশ্যমান অংশ ধারণ করে, যেমন টেক্সট, চিত্র, লিঙ্ক এবং অন্যান্য উপাদান।</p><br>
                <img src="./asset/body close.png" alt="Body Close Tag" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>&lt;/body&gt; ট্যাগ HTML ডকুমেন্টের মূল বিষয়বস্তুর সমাপ্তি নির্দেশ করে। এটি ব্রাউজারকে জানায় যে HTML ডকুমেন্টের বিষয়বস্তু শেষ হয়েছে।</p><br>
                
                `,
      },
      "html-tags": {
        title: "HTML Tags",
        readingTime: "10 min read",
        difficulty: "Beginner",
        body: `
                    <p>একটি HTML ট্যাগ কন্টেন্ট বা অন্যান্য HTML ট্যাগের জন্য একটি ধারক হিসেবে কাজ করে। ট্যাগ হল < এবং > কোণ বন্ধনীর মধ্যে আবদ্ধ শব্দ। এগুলি এমন কীওয়ার্ড হিসেবে কাজ করে যা ওয়েব ব্রাউজারকে কন্টেন্ট কীভাবে ফর্ম্যাট এবং প্রদর্শন করতে হয় তা নির্দেশ করে </p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">HTML Tag Structure:</p><br>
                <img src="./asset/tag structure.png" alt="HTML Tag Structure" style="width: 100%; height: auto; border-radius: 8px;"><br><br>

                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Document Structure Tags:</p><br>
                <ul>
                    <li><code>&lt;doctype&gt;</code> - ডকুমেন্টের প্রকার নির্দেশ করে</li>
                    <li><code>&lt;html&gt;</code> - HTML ডকুমেন্টের মূল উপাদান</li>
                    <li><code>&lt;head&gt;</code> - মেটা তথ্য এবং শিরোনাম ধারণ করে</li>
                    <li><code>&lt;body&gt;</code> - ওয়েব পৃষ্ঠার বিষয়বস্তু ধারণ করে।</li>

                </ul><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Metadata Tags:</p><br>
                <img src="./asset/meta tag.png" alt="Metadata Tag" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>মেটা ট্যাগগুলি HTML ডকুমেন্টের মেটা তথ্য ধারণ করে, যেমন পৃষ্ঠার বর্ণনা, কীওয়ার্ড এবং লেখক তথ্য। এগুলি &lt;head&gt; ট্যাগের মধ্যে স্থাপন করা হয় এবং ব্রাউজার বা সার্চ ইঞ্জিন দ্বারা ব্যবহৃত হয়।</p><br>
                <ul>
                    <li><code>&lt;meta&gt;</code> - মেটা তথ্য ধারণ করে, যেমন পৃষ্ঠার বর্ণনা এবং কীওয়ার্ড।</li>
                    <li><code>&lt;link&gt;</code> - স্টাইলশীট বা অন্যান্য রিসোর্সের সাথে সংযোগ স্থাপন করে।</li>
                    <li><code>&lt;title&gt;</code> - পৃষ্ঠার শিরোনাম নির্ধারণ করে যা ব্রাউজারের ট্যাবে প্রদর্শিত হয়।</li>
                </ul><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Text Formatting Tags:</p><br>
                <img src="./asset/p tag.jpg" alt="Text Formatting Tags" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <ul>
                    <li><code>&lt;p&gt;</code> - প্যারাগ্রাফ তৈরি করে।</li>
                    <li><code>&lt;h1&gt;</code> থেকে <code>&lt;h6&gt;</code> - শিরোনাম তৈরি করে, যেখানে <code>&lt;h1&gt;</code> সবচেয়ে বড় এবং <code>&lt;h6&gt;</code> সবচেয়ে ছোট।</li>
                    <li><code>&lt;br&gt;</code> - লাইন ব্রেক তৈরি করে।</li>
                    <li><code>&lt;strong&gt;</code> - টেক্সটকে শরীর bold করে।</li>
                    <li><code>&lt;em&gt;</code> - টেক্সটকে ইটালিক করে।</li>
                    <li><code>&lt;br&gt;</code> - Line break.</li>
                    <li><code>&lt;hr&gt;</code> - একটি অনুভূমিক রেখা তৈরি করে।</li>
                </ul><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">List Tags:</p><br>
                <img src="./asset/list tag.jpg" alt="List Tag" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <ul>
                    <li><code>&lt;ul&gt;</code> - অর্ডারহীন তালিকা তৈরি করে।</li>
                    <li><code>&lt;ol&gt;</code> - অর্ডার করা তালিকা তৈরি করে।</li>
                    <li><code>&lt;li&gt;</code> - তালিকার একটি আইটেম তৈরি করে।</li>
                </ul><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Hyperlink and Media Tags:</p><br>
                <img src="./asset/a tag.png" alt="Hyperlink and Media Tags" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <ul>
                    <li><code>&lt;a&gt;</code> - হাইপারলিঙ্ক তৈরি করে।</li>
                    <li><code>&lt;img&gt;</code> - চিত্র অন্তর্ভুক্ত করে।</li>
                    <li><code>&lt;video&gt;</code> - ভিডিও অন্তর্ভুক্ত করে।</li>
                    <li><code>&lt;audio&gt;</code> - অডিও অন্তর্ভুক্ত করে।</li>
                </ul><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">form Tags:</p><br>
                
                <ul>
                    <li><code>&lt;form&gt;</code> - একটি ফর্ম তৈরি করে।</li>
                    <li><code>&lt;input&gt;</code> - ব্যবহারকারীর ইনপুট গ্রহণ করে।</li>
                    <li><code>&lt;textarea&gt;</code> - মাল্টি-লাইন টেক্সট ইনপুটের জন্য।</li>
                    <li><code>&lt;button&gt;</code> - একটি বোতাম তৈরি করে।</li>
                    <li><code>&lt;select&gt;</code> - একটি ড্রপডাউন তালিকা তৈরি করে।</li>
                    <li><code>&lt;option&gt;</code> - ড্রপডাউন তালিকার একটি বিকল্প তৈরি করে।</li>
                </ul><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Table Tags:</p><br>
                
                <ul>
                    <li><code>&lt;table&gt;</code> - একটি টেবিল তৈরি করে।</li>
                    <li><code>&lt;tr&gt;</code> - টেবিলের একটি সারি তৈরি করে।</li>
                    <li><code>&lt;td&gt;</code> - টেবিলের একটি ডেটা সেল তৈরি করে।</li>
                    <li><code>&lt;th&gt;</code> - টেবিলের একটি হেডার সেল তৈরি করে।</li>
                    <li><code>&lt;thead&gt;</code> - টেবিলের হেডার অংশ তৈরি করে।</li>
                    <li><code>&lt;tbody&gt;</code> - টেবিলের বডি অংশ তৈরি করে।</li>
                    <li><code>&lt;tfoot&gt;</code> - টেবিলের ফুটার অংশ তৈরি করে।</li>
                </ul><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Semantic Tags:</p><br>
                
                <ul>
                    <li><code>&lt;header&gt;</code> - পৃষ্ঠার হেডার অংশ তৈরি করে।</li>
                    <li><code>&lt;nav&gt;</code> - নেভিগেশন লিঙ্কগুলি ধারণ করে।</li>
                    <li><code>&lt;article&gt;</code> - একটি স্বতন্ত্র নিবন্ধ বা বিষয়বস্তু ব্লক তৈরি করে।</li>
                    <li><code>&lt;section&gt;</code> - একটি বিভাগ তৈরি করে।</li>
                    <li><code>&lt;aside&gt;</code> - মূল বিষয়বস্তুর পাশে থাকা অতিরিক্ত তথ্য ধারণ করে।</li>
                    <li><code>&lt;footer&gt;</code> - পৃষ্ঠার ফুটার অংশ তৈরি করে।</li>
                    <li><code>&lt;main&gt;</code> - পৃষ্ঠার প্রধান বিষয়বস্তু ধারণ করে।</li>
                </ul><br>
                `,
      },
      "html-elements": {
        title: "HTML Elements",
        readingTime: "6 min read",
        difficulty: "Beginner",
        body: `
                <p>একটি HTML উপাদান হল একটি ট্যাগ এবং এর মধ্যে থাকা কন্টেন্টের সমন্বয়। এটি একটি ট্যাগ দিয়ে শুরু হয়, তারপর কন্টেন্ট এবং শেষে একটি বন্ধ ট্যাগ থাকে।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is an HTML Element?</p><br>
                <p>একটি HTML উপাদান হল একটি সম্পূর্ণ সেট যা একটি শুরু ট্যাগ (অথবা খোলার ট্যাগ), কন্টেন্ট এবং একটি শেষ ট্যাগ (অথবা সমাপনী ট্যাগ) নিয়ে গঠিত।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 18px;  ">HTML Element = Start Tag + Content + End Tag</p><br>
                <img src="./asset/p1 tag.png" alt="HTML Element Example" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>উপরের উদাহরণে, <code>&lt;p&gt;</code> হল একটি প্যারাগ্রাফ উপাদান যা "Hello, World!" টেক্সট ধারণ করে।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is a Nested HTML Element?</p><br>
                
                <p>নেস্টেড HTML এলিমেন্ট হলো এমন একটি HTML স্ট্রাকচার যেখানে একটি এলিমেন্ট অন্য একটি এলিমেন্টের ভেতরে স্থাপন করা হয়।</p><br>
                <p>এনক্লোজিং এলিমেন্টকে প্রায়শই "প্যারেন্ট" বলা হয়, যেখানে এনক্লোজিং এলিমেন্টকে "চাইল্ড" বলা হয়।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 18px;  ">Nested HTML Element = One HTML Element Inside Another HTML Element</p><br>
                <img src="./asset/nested tag.png" alt="Nested HTML Element Example" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>উপরের উদাহরণে, <code>&lt;strong&gt;</code> ট্যাগটি <code>&lt;p&gt;</code> ট্যাগের মধ্যে নেস্ট করা হয়েছে। এটি "Hello, World!" টেক্সটকে বোল্ড করে।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is an Empty HTML Element?</p><br>
                <p>একটি খালি HTML উপাদান হল এমন একটি উপাদান যার কোন ক্লোজিং ট্যাগ বা কন্টেন্ট থাকে না। এই উপাদানগুলিকে "void elements" বা "self-closing elements" নামেও পরিচিত।</p><br>
                <p style="font-weight: bold; top: 0; bottom: 0; font-size: 18px;  ">Empty HTML Element = Tags with No Content</p><br>
                <img src="./asset/empty tag.png" alt="Empty HTML Element Example" style="width: 100%; height: auto; border-radius: 8px;"><br><br>
                <p>উপরের উদাহরণে, <code>&lt;br&gt;</code> ট্যাগটি একটি খালি উপাদান। এটি কোন কন্টেন্ট ধারণ করে না এবং একটি ক্লোজিং ট্যাগ প্রয়োজন হয় না।</p><br>

                `,
      },

      "html-attributes": {
        title: "HTML Attributes",
        readingTime: "6 min read",
        difficulty: "Beginner",
        body: `
        <p>HTML এলিমেন্টের বৈশিষ্ট্য নির্ধারণ করতে HTML অ্যাট্রিবিউট ব্যবহার করা হয়। এগুলি এলিমেন্টের ওপেনিং ট্যাগের মধ্যে স্থাপন করা হয় এবং দুটি অংশ নিয়ে গঠিত: <b>Name</b> এবং <b>value</b>।</p>
        <ul>
          <li><b>Name</b>: এটি বৈশিষ্ট্যের নাম, যেমন <code>class</code>, <code>id</code>, ইত্যাদি।</li>
          <li><b>Value</b>: এটি বৈশিষ্ট্যের মান, যা সাধারণত একটি স্ট্রিং হয় এবং এটি সাধারণত উদ্ধৃতিতে থাকে।</li>
        </ul>
        <p>প্রতিটি HTML উপাদান একটি ট্যাগ দ্বারা চিহ্নিত করা হয়, যা সাধারণত একটি খোলার ট্যাগ এবং একটি বন্ধ ট্যাগ নিয়ে গঠিত।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;p&gt;Hello, World!&lt;/p&gt;</code></pre><br>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Types of HTML Attributes</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 20px;  ">There are three main types of HTML attributes:</p>
        <ul>
          <li><b>Core Attributes:</b> এগুলি হল মৌলিক বৈশিষ্ট্য যা বেশিরভাগ HTML উপাদানের ক্ষেত্রে প্রয়োগ করা যেতে পারে। উদাহরণগুলির মধ্যে রয়েছে <code>class</code>, <code>id</code>, and <code>style</code>.</li>
          <li><b>Internationalization Attributes:</b> এই বৈশিষ্ট্যগুলি ডকুমেন্টটিকে বিভিন্ন ভাষা এবং অঞ্চলের সাথে খাপ খাইয়ে নিতে সাহায্য করে। উদাহরণগুলির মধ্যে রয়েছে <code>lang</code>, <code>dir</code>, ইত্যাদি।</li>
          <li><b>Generic Attributes:</b> এই বৈশিষ্ট্যগুলি উপাদান সম্পর্কে অতিরিক্ত তথ্য প্রদান করে কিন্তু এর চেহারা বা আচরণকে প্রভাবিত করে না। উদাহরণগুলির মধ্যে রয়েছে  <code>data-* </code> বৈশিষ্ট্য যা পৃষ্ঠা বা অ্যাপ্লিকেশনের সাথে ব্যক্তিগতভাবে কাস্টম ডেটা সংরক্ষণ করে।</li>
        </ul><br>
        <p>কোর অ্যাট্রিবিউট হল HTML-এ সর্বাধিক ব্যবহৃত কিছু অ্যাট্রিবিউট। এর চারটি প্রধান প্রকার রয়েছে:</p>
        <ul>
          <li><b><code> class:</code></b> এটি একটি CSS ক্লাস নির্ধারণ করে যা উপাদানটির স্টাইল নিয়ন্ত্রণ করে।</li>
          <li><b><code> id:</code></b> এটি একটি ইউনিক আইডেন্টিফায়ার নির্ধারণ করে যা উপাদানটিকে অনন্যভাবে চিহ্নিত করে।</li>
          <li><b><code> style:</code></b> এটি ইনলাইন CSS স্টাইল নির্ধারণ করে যা উপাদানটির চেহারা নিয়ন্ত্রণ করে।</li>
          <li><b><code> title:</code></b> এটি একটি টুলটিপ প্রদর্শন করে যখন ব্যবহারকারী উপাদানের উপর মাউস রাখে।</li>
        </ul><br>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">ID Attribute</p>
        <p>ID অ্যাট্রিবিউটটি একটি HTML এলিমেন্টকে একটি অনন্য শনাক্তকারী বরাদ্দ করতে ব্যবহৃত হয়। প্রতিটি ID সহ এলিমেন্টের নিজস্ব অনন্য পরিচয় থাকে, যেমন প্রতিটি ব্যক্তির একটি অনন্য পরিচয় থাকে। একাধিক এলিমেন্টের একই ID থাকতে পারে না।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;div id="HTML"&gt;This is a HTML Tutorial.&lt;/div&gt;</code></pre>
        <pre><code>&lt;div id="Python"&gt;This is a Python Tutorial.&lt;/div&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>id="HTML"</code> এবং <code>id="Python"</code> অ্যাট্রিবিউটগুলি <code>&lt;div&gt;</code> ট্যাগগুলিকে একটি অনন্য শনাক্তকারী দেয়।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Class Attribute</p>
        <p>ক্লাস অ্যাট্রিবিউটটি একটি HTML এলিমেন্টকে একটি নির্দিষ্ট ক্লাসের সাথে সংযুক্ত করতে ব্যবহৃত হয়, সাধারণত স্টাইলিং বা জাভাস্ক্রিপ্ট ম্যানিপুলেশনের জন্য। ID অ্যাট্রিবিউটের বিপরীতে, ক্লাস অ্যাট্রিবিউটটি অনন্য নয় এবং একাধিক এলিমেন্ট একই ক্লাস ভাগ করতে পারে।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;div class="HTML"&gt;This is a HTML Tutorial.&lt;/div&gt;</code></pre>
        <pre><code>&lt;div class="Python"&gt;This is a Python Tutorial.&lt;/div&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>class="HTML"</code> এবং <code>class="Python"</code> অ্যাট্রিবিউটগুলি <code>&lt;div&gt;</code> ট্যাগগুলিকে একটি নির্দিষ্ট ক্লাস বরাদ্দ করে।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Title Attribute</p>
        <p>title অ্যাট্রিবিউটটি একটি এলিমেন্ট সম্পর্কে অতিরিক্ত তথ্য প্রদান করে এবং প্রায়শই মাউস যখন এটির উপর ঘোরাফেরা করে তখন এটি একটি টুলটিপ হিসাবে প্রদর্শিত হয়।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;a href="https://www.example.com" title="Visit Example"&gt;Example Link&lt;/a&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>title="Visit Example"</code> অ্যাট্রিবিউটটি লিঙ্কের উপর মাউস রাখলে "Visit Example" টুলটিপ প্রদর্শন করবে।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Style Attribute</p>
        <p>style অ্যাট্রিবিউটটি একটি এলিমেন্টের জন্য ইনলাইন CSS স্টাইল নির্ধারণ করতে ব্যবহৃত হয়। এটি এলিমেন্টের চেহারা নিয়ন্ত্রণ করে।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;div style="color: blue; font-size: 20px;"&gt;This is a styled div.&lt;/div&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>style="color: blue; font-size: 20px;"</code> অ্যাট্রিবিউটটি <code>&lt;div&gt;</code> ট্যাগের টেক্সটের রঙ নীল এবং ফন্ট সাইজ 20 পিক্সেল করে।</p>
        `,
      },

       "html-comments": {
        title: "HTML comments",
        readingTime: "6 min read",
        difficulty: "Beginner",
        body: `
        <p>HTML-এ মন্তব্যগুলি হল আপনার কোডে নিজের জন্য বা অন্যদের জন্য রেখে যাওয়া ছোট ছোট নোটের মতো। এই নোটগুলি কোডটি বোঝা সহজ করে তোলে কিন্তু প্রকৃত ওয়েবসাইটে প্রদর্শিত হয় না। ওয়েব ব্রাউজার কেবল সেগুলি এড়িয়ে যায়!</p>
        <p>Key Points About HTML Comments</p>
        <ul>
          <li>ওয়েব ব্রাউজারগুলি মন্তব্য উপেক্ষা করে।</li>
          <li>তারা কোড পঠনযোগ্যতা এবং ডকুমেন্টেশনে সহায়তা করে।</li>
          <li>মন্তব্যগুলি <code>&lt;!--</code> দিয়ে শুরু হয় এবং <code>--&gt;</code> দিয়ে শেষ হয়।</li>
          <li>HTML মন্তব্যগুলি <!-- content --> দ্বারা নির্দেশিত হয়।</li>
          <li>কোড কমেন্ট করার শর্টকাট কী হল <code>Ctrl + /</code> (Windows) অথবা <code>Cmd + /</code> (Mac)।</li>
          <li>HTML একক-লাইন এবং বহু-লাইন উভয় মন্তব্য সমর্থন করে।</li>
        </ul>
        <p>Types of Comments in HTML</p>
        <ul>
          <li>Single-line comments: These are comments that occupy a single line and are typically used for brief explanations.</li>
          <li>Multi-line comments: These comments can span multiple lines and are useful for more detailed descriptions.</li>
        </ul>
        <p>Single-line comments are created using the <code>&lt;!--</code> and <code>--&gt;</code> syntax, while multi-line comments can be created using the same syntax but can span multiple lines.</p>
        <p>Example of Single-line Comment:</p>
        <pre><code>&lt;!-- This is a single-line comment --&gt;</code></pre>
        <p>Example of Multi-line Comment:</p>
        <pre><code>&lt;!-- This is a multi-line comment
It can span multiple lines
--&gt;</code></pre>
        <p>উপরের উদাহরণগুলিতে, মন্তব্যগুলি <code>&lt;!--</code> এবং <code>--&gt;</code> এর মধ্যে আবদ্ধ, যা নির্দেশ করে যে সেগুলি মন্তব্য এবং ওয়েব পৃষ্ঠায় প্রদর্শিত হবে না।</p>
        <p>মন্তব্যগুলি আপনার কোড ডকুমেন্ট করার, জটিল লজিক ব্যাখ্যা করার, বা আপনার কোডের নির্দিষ্ট অংশগুলি অস্থায়ীভাবে অক্ষম করার জন্য উপকারী।</p>
        <p>মনে রাখবেন, মন্তব্যগুলি ওয়েব পৃষ্ঠায় ব্যবহারকারীদের জন্য দৃশ্যমান নয়, তবে তারা ডেভেলপারদের জন্য কোডটি আরও ভালভাবে বোঝার জন্য অপরিহার্য।</p>
        <p>সারসংক্ষেপে, HTML মন্তব্যগুলি কোডের পাঠযোগ্যতা এবং রক্ষণাবেক্ষণযোগ্যতা বাড়ানোর জন্য একটি শক্তিশালী সরঞ্জাম। তারা ডেভেলপারদেরকে কোডের মধ্যে নোট, ব্যাখ্যা এবং স্মরণিকা ছেড়ে দিতে দেয়, যা ওয়েব পৃষ্ঠায় প্রদর্শিত প্রকৃত বিষয়বস্তুকে প্রভাবিত করে না।</p>
      `,
      },

      "html-id-classes": {
        title: "HTML Id & Classes",
        readingTime: "6 min read",
        difficulty: "Beginner",
        body: `
        <p>HTML ID এবং ক্লাসগুলি HTML উপাদানগুলিকে চিহ্নিত এবং স্টাইল করার জন্য ব্যবহৃত হয়। এগুলি CSS এবং জাভাস্ক্রিপ্টের সাথে কাজ করার সময় খুবই গুরুত্বপূর্ণ।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">HTML ID</p>
        <p>HTML ID হল একটি অনন্য শনাক্তকারী যা একটি HTML উপাদানকে চিহ্নিত করতে ব্যবহৃত হয়। এটি একটি পৃষ্ঠায় একবারই ব্যবহার করা উচিত এবং এটি <code>id</code> অ্যাট্রিবিউটের মাধ্যমে নির্ধারিত হয়।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">HTML Classes</p>
        <p>HTML ক্লাসগুলি একাধিক উপাদানকে গ্রুপ করতে এবং তাদের একই স্টাইল প্রয়োগ করতে ব্যবহৃত হয়। এটি <code>class</code> অ্যাট্রিবিউটের মাধ্যমে নির্ধারিত হয়।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is an ID?</p>
        <p>HTML ID হল একটি অনন্য শনাক্তকারী যা একটি HTML উপাদানকে চিহ্নিত করতে ব্যবহৃত হয়। এটি একটি পৃষ্ঠায় একবারই ব্যবহার করা উচিত এবং এটি <code>id</code> অ্যাট্রিবিউটের মাধ্যমে নির্ধারিত হয়।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;div id="header"&gt;This is the header section.&lt;/div&gt;</code></pre><br>
        <p>উপরের উদাহরণে, <code>id="header"</code> অ্যাট্রিবিউটটি <code>&lt;div&gt;</code> ট্যাগটিকে একটি অনন্য শনাক্তকারী দেয়।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is a Class?</p>
        <p>HTML ক্লাসগুলি একাধিক উপাদানকে গ্রুপ করতে এবং তাদের একই স্টাইল প্রয়োগ করতে ব্যবহৃত হয়। এটি <code>class</code> অ্যাট্রিবিউটের মাধ্যমে নির্ধারিত হয়।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;div class="container"&gt;This is a container section.&lt;/div&gt;</code></pre><br>
        <p>উপরের উদাহরণে, <code>class="container"</code> অ্যাট্রিবিউটটি <code>&lt;div&gt;</code> ট্যাগটিকে একটি ক্লাস বরাদ্দ করে।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Difference Between ID and Class</p>
        <p>HTML ID এবং ক্লাসের মধ্যে প্রধান পার্থক্য হল:</p>
        <ul>
          <li><b>Uniqueness:</b> ID হল একটি অনন্য শনাক্তকারী যা একটি HTML উপাদানকে চিহ্নিত করে, যেখানে ক্লাস একাধিক উপাদানকে গ্রুপ করতে ব্যবহৃত হয়।</li>
          <li><b>Usage:</b> ID সাধারণত একটি পৃষ্ঠায় একবারই ব্যবহার করা হয়, যেখানে ক্লাস একাধিক উপাদানকে গ্রুপ করতে এবং তাদের একই স্টাইল প্রয়োগ করতে ব্যবহৃত হয়।</li>
          <li><b>CSS Selectors:</b> ID সিলেক্টরগুলি <code>#idName</code> এর মাধ্যমে চিহ্নিত হয়, যেখানে ক্লাস সিলেক্টরগুলি <code>.className</code> এর মাধ্যমে চিহ্নিত হয়।</li>
        </ul>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">The Style Tag</p>
        <p>HTML ডকুমেন্টে স্টাইল প্রয়োগ করতে <code>&lt;style&gt;</code> ট্যাগ ব্যবহার করা হয়। এটি সাধারণত <code>&lt;head&gt;</code> ট্যাগের মধ্যে স্থাপন করা হয় এবং CSS কোড ধারণ করে।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;head&gt;
  &lt;style&gt;
    body { background-color: lightblue; }
    h1 { color: navy; font-size: 24px; }
  &lt;/style&gt;
&lt;/head&gt;</code></pre><br>
        <p>উপরের উদাহরণে, <code>&lt;style&gt;</code> ট্যাগটি <code>&lt;head&gt;</code> ট্যাগের মধ্যে স্থাপন করা হয়েছে এবং CSS কোড ধারণ করে যা পৃষ্ঠার ব্যাকগ্রাউন্ড এবং শিরোনামের স্টাইল নির্ধারণ করে।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Using IDs and Classes in CSS</p>
        <p>CSS-এ ID এবং ক্লাস ব্যবহার করে স্টাইল প্রয়োগ করা যায়। ID সিলেক্টরগুলি <code>#idName</code> এর মাধ্যমে চিহ্নিত হয়, যেখানে ক্লাস সিলেক্টরগুলি <code>.className</code> এর মাধ্যমে চিহ্নিত হয়।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>#header {
  background-color: lightgray;
  padding: 10px;
}
.container {
  margin: 20px;
  border: 1px solid black;
}</code></pre><br>
        <p>উপরের উদাহরণে, <code>#header</code> সিলেক্টরটি <code>id="header"</code> সহ উপাদানটিকে স্টাইল করে এবং <code>.container</code> সিলেক্টরটি <code>class="container"</code> সহ উপাদানগুলিকে স্টাইল করে।</p>
        
      `,
      },

      "skeletal-tags": {
        title: "HTML skeletal-tags",
       readingTime: "6 min read",
        difficulty: "Beginner",
        body: `<p>HTML স্কেলেটাল ট্যাগগুলি হল মৌলিক কাঠামো যা একটি HTML ডকুমেন্ট তৈরি করতে ব্যবহৃত হয়। এগুলি সাধারণত একটি ডকুমেন্টের মূল উপাদানগুলি চিহ্নিত করতে ব্যবহৃত হয়।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;!DOCTYPE html&gt;
        &lt;html&gt;
        &lt;head&gt;
          &lt;title&gt;My Web Page&lt;/title&gt;
        &lt;/head&gt;
        &lt;body&gt;
          &lt;h1&gt;Welcome to My Web Page&lt;/h1&gt;
          &lt;p&gt;This is a simple web page.&lt;/p&gt;
        &lt;/body&gt;
        &lt;/html&gt;</code></pre><br>
        <p>উপরের উদাহরণে, HTML ডকুমেন্টের মৌলিক কাঠামো চিহ্নিত করতে বিভিন্ন স্কেলেটাল ট্যাগ ব্যবহার করা হয়েছে।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  "><pre><code>&lt;html&gt;</code> "Tag: Root of an HTML Page"</pre></p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Syntax:</p>
        <pre><code>&lt;html&gt; ... &lt;/html&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>&lt;html&gt;</code> ট্যাগটি HTML ডকুমেন্টের মূল উপাদান। এটি ডকুমেন্টের শুরুতে এবং শেষে ব্যবহৃত হয়।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  "><pre><code>&lt;head&gt;</code> "Tag: Metadata and Title"</pre></p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Syntax:</p>
        <pre><code>&lt;head&gt; ... &lt;/head&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>&lt;head&gt;</code> ট্যাগটি HTML ডকুমেন্টের মেটাডেটা এবং শিরোনাম ধারণ করে। এটি ডকুমেন্টের তথ্য যেমন শিরোনাম, মেটা ট্যাগ এবং লিঙ্কগুলি ধারণ করে।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  "><pre><code>&lt;title&gt;</code> "Tag: Document Title"</pre></p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Syntax:</p>
        <pre><code>&lt;title&gt; ... &lt;/title&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>&lt;title&gt;</code> ট্যাগটি HTML ডকুমেন্টের শিরোনাম ধারণ করে। এটি ব্রাউজারের ট্যাব বা উইন্ডোর শিরোনাম হিসেবে প্রদর্শিত হয়।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  "><pre><code>&lt;body&gt;</code> "Tag: Main Content of the Page"</pre></p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Syntax:</p>
        <pre><code>&lt;body&gt; ... &lt;/body&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>&lt;body&gt;</code> ট্যাগটি HTML ডকুমেন্টের মূল বিষয়বস্তু ধারণ করে। এটি পৃষ্ঠার দৃশ্যমান অংশ, যেমন টেক্সট, চিত্র এবং অন্যান্য উপাদানগুলি ধারণ করে. </p>
       `,

      },

      "heading-tags":{

        title: "HTML Heading Tags",
        readingTime: "6 min read",
        difficulty: "Beginner",
        body: `
        <p>HTML হেডিং ট্যাগগুলি পৃষ্ঠার শিরোনাম এবং উপশিরোনাম তৈরি করতে ব্যবহৃত হয়। এগুলি &lt;h1&gt; থেকে &lt;h6&gt; পর্যন্ত ট্যাগের মাধ্যমে চিহ্নিত করা হয়, যেখানে &lt;h1&gt; হল সবচেয়ে বড় এবং &lt;h6&gt; হল সবচেয়ে ছোট।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What are HTML Heading Tags?</p>
        <p>HTML হেডিং ট্যাগগুলি পৃষ্ঠার শিরোনাম এবং উপশিরোনাম তৈরি করতে ব্যবহৃত হয়। এগুলি &lt;h1&gt; থেকে &lt;h6&gt; পর্যন্ত ট্যাগের মাধ্যমে চিহ্নিত করা হয়, যেখানে &lt;h1&gt; হল সবচেয়ে বড় এবং &lt;h6&gt; হল সবচেয়ে ছোট।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Syntax of HTML Heading Tags</p>
        <pre><code>&lt;h1&gt;Heading Level 1&lt;/h1&gt;</code></pre>
        <p><b>Note: </b><code>&lt;h1&gt;</code> ট্যাগটি প্রথম স্তরের শিরোনামকে সংজ্ঞায়িত করে এবং সাধারণত সমস্ত শিরোনাম ট্যাগগুলির মধ্যে বৃহত্তম এবং সাহসী। এটি প্রায়শই পৃষ্ঠার মূল শিরোনামের জন্য ব্যবহৃত হয়।</p>
        <pre><code> &lt;h2&gt;Heading Level 2&lt;/h2&gt;</code></pre>
        <p><b>Note: </b><code>&lt;h2&gt;</code> ট্যাগটি দ্বিতীয় স্তরের শিরোনামের জন্য ব্যবহৃত হয় এবং <code>&lt;h1&gt;</code> ট্যাগের চেয়ে কিছুটা ছোট। এটি সাধারণত বিভাগের শিরোনামগুলির জন্য ব্যবহৃত হয়।</p>
        <pre><code> &lt;h3&gt;Heading Level 3&lt;/h3&gt;</code></pre>
        <p><b>Note: </b><code>&lt;h3&gt;</code> ট্যাগটি তৃতীয় স্তরের শিরোনামের জন্য ব্যবহৃত হয়। এগুলি <code>&lt;h2&gt;</code> ট্যাগগুলির চেয়ে ছোট এবং প্রায়শই <code>&lt;h2&gt;</code> বিভাগের মধ্যে উপ-বিভাগগুলির জন্য ব্যবহৃত হয়।</p>
        <pre><code> &lt;h4&gt;Heading Level 4&lt;/h4&gt;</code></pre>
        <p><b>Note: </b><code>&lt;h4&gt;</code> ট্যাগটি চতুর্থ স্তরের শিরোনামকে সংজ্ঞায়িত করে, যা <code>&lt;h3&gt;</code> ট্যাগের চেয়ে ছোট। এটি প্রায়শই একটি <code>&lt;h3&gt;</code> বিভাগের মধ্যে উপ-বিভাগগুলির জন্য ব্যবহৃত হয়।</p>
        <pre><code> &lt;h5&gt;Heading Level 5&lt;/h5&gt;</code></pre>
        <p><b>Note: </b><code>&lt;h5&gt;</code> ট্যাগটি পঞ্চম স্তরের শিরোনামের জন্য ব্যবহৃত হয় এবং <code>&lt;h4&gt;</code> ট্যাগগুলির চেয়ে ছোট। এগুলি খুব কমই ব্যবহৃত হয় তবে গভীরভাবে নেস্টেড বিভাগগুলির জন্য সহায়ক হতে পারে।</p>
        <pre><code> &lt;h6&gt;Heading Level 6&lt;/h6&gt;</code></pre>
        <p><b>Note: </b><code>&lt;h6&gt;</code> ট্যাগটি ষষ্ঠ স্তরের শিরোনামকে সংজ্ঞায়িত করে এবং সমস্ত শিরোনাম ট্যাগগুলির মধ্যে সবচেয়ে ছোট। এটি খুব কমই ব্যবহৃত হয় তবে নির্দিষ্ট বিন্যাসের প্রয়োজনীয়তাগুলি পরিবেশন করতে পারে।</p>
        <p>উপরের উদাহরণে, <code>&lt;h1&gt;</code> থেকে <code>&lt;h6&gt;</code> পর্যন্ত ট্যাগগুলি বিভিন্ন স্তরের শিরোনাম তৈরি করতে ব্যবহৃত হয়।</p>

        `,   
        
        
     },

    "paragraph-tag": {
      title: "HTML Paragraph Tag",
      readingTime: "6 min read",
      difficulty: "Beginner",
      body: `
        <p>HTML প্যারাগ্রাফ ট্যাগ হল <code>&lt;p&gt;</code> এবং <code>&lt;/p&gt;</code> এর মধ্যে থাকা টেক্সটের একটি ব্লক। এটি সাধারণত একটি পৃষ্ঠায় একটি নতুন প্যারাগ্রাফ শুরু করতে ব্যবহৃত হয়।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is a Paragraph Tag?</p>
        <p>HTML প্যারাগ্রাফ ট্যাগ হল <code>&lt;p&gt;</code> এবং <code>&lt;/p&gt;</code> এর মধ্যে থাকা টেক্সটের একটি ব্লক। এটি সাধারণত একটি পৃষ্ঠায় একটি নতুন প্যারাগ্রাফ শুরু করতে ব্যবহৃত হয়।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Syntax of Paragraph Tag</p>
        <pre><code>&lt;p&gt;This is a paragraph.&lt;/p&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>&lt;p&gt;</code> ট্যাগটি একটি প্যারাগ্রাফ তৈরি করে যা "This is a paragraph." টেক্সট ধারণ করে।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Usage of Paragraph Tag</p>
        <ul>
          <li>পৃষ্ঠায় পাঠ্য ব্লক তৈরি করতে ব্যবহৃত হয়।</li>
          <li>পাঠ্যকে বিভিন্ন অংশে বিভক্ত করতে সহায়ক।</li>
          <li>পাঠ্যের ফর্ম্যাটিং এবং স্টাইলিংয়ের জন্য CSS ব্যবহার করা যেতে পারে।</li>
        </ul>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>&lt;p&gt;This is the first paragraph.&lt;/p&gt;</code></pre>
        <pre><code>&lt;p&gt;This is the second paragraph.&lt;/p&gt;</code></pre>
        <p>উপরের উদাহরণে, দুটি প্যারাগ্রাফ তৈরি করা হয়েছে, প্রতিটি <code>&lt;p&gt;</code> ট্যাগ দ্বারা চিহ্নিত।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is a Paragraph?</p>
        <p>একটি প্যারাগ্রাফ হল একটি টেক্সটের একটি ব্লক যা সাধারণত একটি বা একাধিক বাক্য নিয়ে গঠিত। এটি একটি নির্দিষ্ট বিষয় বা ধারণা উপস্থাপন করে এবং সাধারণত একটি নতুন লাইন দিয়ে শুরু হয়।</p>
        <p>উদাহরণস্বরূপ:</p>
        <pre><code>This is a paragraph. It contains one or more sentences that discuss a specific topic or idea.</code></pre>
        <p>উপরের উদাহরণে, "This is a paragraph." একটি প্যারাগ্রাফ যা একটি নির্দিষ্ট বিষয় বা ধারণা উপস্থাপন করে।</p>
        <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Attributes and Styling</p>
        <p><code>&lt;p&gt;</code> ট্যাগটি সহজবোধ্য হলেও, আপনি CSS স্টাইলিংয়ের জন্য ক্লাস বা আইডির মতো বিভিন্ন বৈশিষ্ট্য ব্যবহার করে এর কার্যকারিতা উন্নত করতে পারেন। আপনি স্টাইল বৈশিষ্ট্য ব্যবহার করে ইনলাইন শৈলীও অন্তর্ভুক্ত করতে পারেন।</p>
        <pre><code>&lt;p class="my-paragraph" style="color: blue; font-size: 16px;"&gt;This is a styled paragraph.&lt;/p&gt;</code></pre>
        <p>উপরের উদাহরণে, <code>class="my-paragraph"</code> এবং <code>style="color: blue; font-size: 16px;"</code> অ্যাট্রিবিউটগুলি প্যারাগ্রাফটিকে একটি নির্দিষ্ট ক্লাস এবং স্টাইল প্রদান করে।</p>
       


         `,
       },

       "horizontal-line": {
        title: "horizontal-line",
        readingTime: "2 min read",
        difficulty: "Beginner",
        body: `
          <p>HTML এ একটি অনুভূমিক লাইন তৈরি করতে <code>&lt;hr&gt;</code> ট্যাগ ব্যবহার করা হয়। এটি সাধারণত একটি বিভাগ বা বিষয়বস্তু ব্লকের মধ্যে একটি বিভাজক হিসাবে কাজ করে।</p>
          <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is a Horizontal Line?</p>
          <p>HTML এ একটি অনুভূমিক লাইন হল একটি দৃশ্যমান বিভাজক যা পৃষ্ঠায় বিভিন্ন অংশকে আলাদা করতে ব্যবহৃত হয়। এটি সাধারণত একটি একক লাইন হিসাবে প্রদর্শিত হয় যা পুরো প্রস্থ জুড়ে প্রসারিত হয়।</p>
          <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Syntax of Horizontal Line</p>
          <pre><code>&lt;hr&gt;</code></pre>
          <p>উপরের উদাহরণে, <code>&lt;hr&gt;</code> ট্যাগটি একটি অনুভূমিক লাইন তৈরি করে।</p>
          <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Usage of Horizontal Line</p>
          <ul>
            <li>বিভিন্ন বিষয়বস্তু ব্লক আলাদা করতে ব্যবহৃত হয়।</li>
            <li>পৃষ্ঠায় একটি ভিজ্যুয়াল বিভাজক তৈরি করতে সহায়ক।</li>
          </ul>
          <p>উদাহরণস্বরূপ:</p>
          <pre><code>&lt;hr&gt;</code></pre>
          <p>উপরের উদাহরণে, একটি অনুভূমিক লাইন তৈরি করা হয়েছে।</p>
          <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is a Horizontal Rule?</p>
          <p>একটি অনুভূমিক নিয়ম হল একটি HTML উপাদান যা একটি অনুভূমিক লাইন তৈরি করে। এটি সাধারণত একটি বিভাগ বা বিষয়বস্তু ব্লকের মধ্যে একটি বিভাজক হিসাবে কাজ করে।</p>
          <p>উদাহরণস্বরূপ:</p>
          <pre><code>This is a paragraph above the horizontal line.</code></pre>
          <pre><code>&lt;hr&gt;</code></pre>
          <pre><code>This is a paragraph below the horizontal line.</code></pre>
          <p>উপরের উদাহরণে, একটি অনুভূমিক নিয়ম দুটি প্যারাগ্রাফ আলাদা করতে ব্যবহৃত হয়েছে।</p>
          
        `,
      },

      "line-break": {
        title: "line-break",
        readingTime: "2 min read",
        difficulty: "Beginner",
        body: `
          <p>HTML এ একটি লাইন ব্রেক তৈরি করতে <code>&lt;br&gt;</code> ট্যাগ ব্যবহার করা হয়। এটি সাধারণত একটি নতুন লাইন শুরু করতে ব্যবহৃত হয়।</p>
          <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">What is a Line Break?</p>
          <p>HTML এ একটি লাইন ব্রেক হল একটি উপাদান যা একটি নতুন লাইন শুরু করে। এটি সাধারণত একটি প্যারাগ্রাফের মধ্যে ব্যবহৃত হয় যেখানে একটি নতুন লাইন প্রয়োজন।</p>
          <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Syntax of Line Break</p>
          <pre><code>&lt;br&gt;</code></pre>
          <p>উপরের উদাহরণে, <code>&lt;br&gt;</code> ট্যাগটি একটি লাইন ব্রেক তৈরি করে।</p>
          <p style="font-weight: bold; top: 0; bottom: 0; font-size: 30px;  ">Usage of Line Break</p>
          <ul>
            <li>একটি নতুন লাইন শুরু করতে ব্যবহৃত হয়।</li>
            <li>পৃষ্ঠায় একটি ভিজ্যুয়াল বিভাজক তৈরি করতে সহায়ক।</li>
          </ul>
          <p>উদাহরণস্বরূপ:</p>
          <pre><code>This is a line of text.<br>This is another line of text.</code></pre>
          <p>উপরের উদাহরণে, একটি লাইন ব্রেক ব্যবহার করে দুটি টেক্সট লাইনের মধ্যে একটি নতুন লাইন তৈরি করা হয়েছে।</p>
        `,
      },



    }

    return (
      contentMap[key] || {
        title: "Content Not Found",
        readingTime: "1 min read",
        difficulty: "Beginner",
        body: "<p>This content is under construction. Please check back later.</p>",
      }
    )
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HTMLTutorialApp()
})

// Handle service worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
