// Bilingual content for the Infra Core site (Georgian default + English).
// Every string here is faithful to the materials the client provided.

export type Lang = "ka" | "en";

export interface Item {
  t: string;
  d: string;
}

export interface Dict {
  meta: { title: string; description: string };
  skip: string;
  nav: {
    products: string;
    services: string;
    why: string;
    vendors: string;
    process: string;
    contact: string;
    quote: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    cta1: string;
    cta2: string;
    trust: [string, string, string];
  };
  herocard: { label: string; rows: string[]; turnkey: string };
  what: { srTitle: string; items: Item[] };
  products: { eyebrow: string; title: string; lead: string; more: string; items: Item[] };
  services: { eyebrow: string; title: string; lead: string; items: Item[] };
  why: { eyebrow: string; title: string; items: Item[] };
  vendors: { eyebrow: string; title: string; brands: string[]; note: string };
  process: { eyebrow: string; title: string; steps: Item[] };
  contact: { eyebrow: string; title: string; lead: string; city: string };
  form: {
    name: string;
    company: string;
    phone: string;
    email: string;
    sector: string;
    sectorPh: string;
    message: string;
    messagePh: string;
    consent: string;
    submit: string;
    sending: string;
    ok: string;
    err: string;
    required: string;
    consentErr: string;
    notConfigured: string;
  };
  footer: {
    tag: string;
    products: string;
    services: string;
    contact: string;
    productLinks: string[];
    serviceLinks: string[];
    rights: string;
    built: string;
  };
  floats: { tg: string; wa: string };
}

const ka: Dict = {
  meta: {
    title: "Infra Core — სრული IT გადაწყვეტილებები თქვენი ოფისისთვის",
    description:
      "Infra Core — კომპიუტერები, ქსელი, პრინტერები, Jabra ყურსასმენები და პროგრამული უზრუნველყოფა ბიზნესისთვის. სწრაფი მიწოდება, მონტაჟი, ოფიციალური გარანტია.",
  },
  skip: "მთავარ კონტენტზე გადასვლა",
  nav: {
    products: "პროდუქტები",
    services: "სერვისები",
    why: "რატომ ჩვენ",
    vendors: "ბრენდები",
    process: "როგორ ვმუშაობთ",
    contact: "კონტაქტი",
    quote: "მოითხოვე შეთავაზება",
  },
  hero: {
    eyebrow: "სრული IT გადაწყვეტილებები ბიზნესისთვის",
    title: "ყველაფერი, რაზეც თქვენი ოფისი მუშაობს — მოწოდება, დაყენება და მხარდაჭერა.",
    sub: "კომპიუტერები, ქსელი, პრინტერები, Jabra ყურსასმენები და პროგრამული უზრუნველყოფა — სწრაფი მიწოდებით, მონტაჟით და ოფიციალური გარანტიით.",
    cta1: "მოითხოვე შეთავაზება",
    cta2: "ნახე პროდუქტები",
    trust: ["ოფიციალური გარანტია", "სწრაფი მიწოდება", "კონკურენტული ფასები"],
  },
  herocard: {
    label: "ოფისის აღჭურვა",
    rows: [
      "სამუშაო სადგურები / Mini PC",
      "ქსელი · Wi-Fi · სვიჩები",
      "პრინტერები · პერიფერია",
      "პროგრამები · ლიცენზიები",
      "Jabra ყურსასმენები",
    ],
    turnkey: "ერთ სივრცეში — გასაღების ჩაბარებამდე",
  },
  what: {
    srTitle: "რას ვაკეთებთ",
    items: [
      { t: "ერთი მომწოდებელი მთელი ოფისისთვის", d: "ტექნიკა, ქსელი, ლიცენზიები და აქსესუარები — ერთ ადგილას." },
      { t: "მიწოდება და მონტაჟი", d: "სწრაფი მიწოდება და დაყენება — ოფისის სრული აღჭურვა გასაღების ჩაბარებამდე." },
      { t: "ოფიციალური გარანტია ყველაფერზე", d: "ყველა აღჭურვილობას ახლავს ოფიციალური გარანტია." },
      { t: "პროფესიონალური კონსულტაცია და მხარდაჭერა", d: "დაგეხმარებით სწორი არჩევანის გაკეთებაში და გვერდში დაგიდგებით." },
    ],
  },
  products: {
    eyebrow: "პროდუქტები",
    title: "რას ვაწვდით",
    lead: "ყველაფერი, რაც თქვენს ოფისს სჭირდება — ერთ ადგილას, ოფიციალური გარანტიით.",
    more: "დეტალურად",
    items: [
      { t: "კომპიუტერები და Mini PC", d: "PC-ები, Mini PC, სამუშაო სადგურები და All-in-One კომპიუტერები — მათ შორის Beelink." },
      { t: "მონიტორები და აქსესუარები", d: "მონიტორები და აქსესუარები ოფისისთვის." },
      { t: "ქსელის აღჭურვილობა", d: "სვიჩები, როუტერები და Wi-Fi გადაწყვეტილებები." },
      { t: "პრინტერები და საოფისე ტექნიკა", d: "პრინტერები, MFP, სკანერები და საოფისე ტექნიკა." },
      { t: "ყურსასმენები და აუდიო — Jabra", d: "Jabra ყურსასმენები და სხვა ყურსასმენები ოფისისა და call-center-ისთვის." },
      { t: "პროგრამები და ლიცენზიები", d: "პროგრამული უზრუნველყოფა და ლიცენზირება ბიზნესისთვის." },
    ],
  },
  services: {
    eyebrow: "სერვისები",
    title: "მეტი, ვიდრე უბრალოდ ტექნიკა",
    lead: "ვაწვდით, ვაყენებთ და ვუვლით თქვენს IT-ს — რომ თქვენ თქვენი ბიზნესით იყოთ დაკავებული.",
    items: [
      { t: "ოფიციალური გარანტია", d: "ოფიციალური გარანტია მთელ აღჭურვილობაზე." },
      { t: "მიწოდება და მონტაჟი", d: "სწრაფი მიწოდება, დაყენება და ოფისის სრული აღჭურვა — გასაღების ჩაბარებამდე." },
      { t: "კონსულტაცია და მხარდაჭერა", d: "პროფესიონალური კონსულტაცია სწორი არჩევანისთვის და ტექნიკური მხარდაჭერა." },
      { t: "IT ინფრასტრუქტურა", d: "სარეზერვო ასლები, ქსელის მოდერნიზაცია და პროფილაქტიკა — პრევენცია უფრო იაფია, ვიდრე აღდგენა." },
    ],
  },
  why: {
    eyebrow: "რატომ Infra Core",
    title: "რატომ ირჩევენ ბიზნესები ჩვენ",
    items: [
      { t: "ერთი მომწოდებელი მთელი ოფისისთვის", d: "ტექნიკა, ქსელი, ლიცენზიები და აქსესუარები — ერთ ადგილას." },
      { t: "კონკურენტული ფასები", d: "ხელსაყრელი ფასები — მცირე გუნდიდან მთელ კორპორატიულ ოფისამდე." },
      { t: "End-to-end ოფისის აღჭურვა", d: "კონსულტაციიდან მონტაჟამდე და გარანტიამდე — სრული მომსახურება." },
    ],
  },
  vendors: {
    eyebrow: "ბრენდები",
    title: "ბრენდები, რომელთაც ვაწვდით",
    brands: ["Beelink", "Jabra"],
    note: "ყველა სავაჭრო ნიშანი ეკუთვნის მათ მფლობელებს. პარტნიორი ბრენდების სრული სია მალე განახლდება.",
  },
  process: {
    eyebrow: "როგორ ვმუშაობთ",
    title: "ცარიელი ოფისიდან სრულად აღჭურვილამდე — სამ ნაბიჯში",
    steps: [
      { t: "კონსულტაცია", d: "გავიგებთ თქვენს საჭიროებებს და შემოგთავაზებთ სწორ აღჭურვილობას." },
      { t: "მიწოდება და დაყენება", d: "ვაწვდით, ვაყენებთ ქსელს, ვაკონფიგურირებთ კომპიუტერებსა და ლიცენზიებს." },
      { t: "გარანტია და მხარდაჭერა", d: "ვრჩებით თქვენთან — ოფიციალური გარანტიითა და ტექნიკური მხარდაჭერით." },
    ],
  },
  contact: {
    eyebrow: "დაგვიკავშირდით",
    title: "გვითხარით, რა სჭირდება თქვენს ოფისს",
    lead: "შეავსეთ ფორმა და მიიღეთ შეთავაზება — დაგიკავშირდებით უმოკლეს დროში.",
    city: "საქართველო",
  },
  form: {
    name: "სახელი *",
    company: "კომპანია",
    phone: "ტელეფონი *",
    email: "ელ. ფოსტა",
    sector: "საქმიანობის სფერო",
    sectorPh: "მაგ.: იურიდიული, რესტორანი/კვება, ვაჭრობა, კლინიკა…",
    message: "შეტყობინება",
    messagePh: "რამდენი სამუშაო ადგილი? რა გჭირდებათ?",
    consent: "თანახმა ვარ, ჩემი პერსონალური მონაცემები დამუშავდეს ამ მოთხოვნაზე პასუხის გასაცემად.",
    submit: "მიიღე შეთავაზება",
    sending: "იგზავნება…",
    ok: "მადლობა! თქვენი მოთხოვნა მიღებულია — დაგიკავშირდებით მალე.",
    err: "დაფიქსირდა შეცდომა. სცადეთ თავიდან ან დაგვირეკეთ.",
    required: "გთხოვთ, შეავსოთ სავალდებულო ველები.",
    consentErr: "გთხოვთ, დაეთანხმოთ მონაცემთა დამუშავებას.",
    notConfigured:
      "ფორმა ჯერ არ არის კონფიგურირებული (იხ. README). სანაცვლოდ მოგვწერეთ: info@infracore-consulting.com",
  },
  footer: {
    tag: "ერთი მომწოდებელი მთელი ოფისისთვის — ტექნიკა, ქსელი, ლიცენზიები და მხარდაჭერა.",
    products: "პროდუქტები",
    services: "სერვისები",
    contact: "კონტაქტი",
    productLinks: ["კომპიუტერები და Mini PC", "ქსელის აღჭურვილობა", "პრინტერები", "პროგრამები და ლიცენზიები"],
    serviceLinks: ["ოფიციალური გარანტია", "მიწოდება და მონტაჟი", "კონსულტაცია და მხარდაჭერა", "IT ინფრასტრუქტურა"],
    rights: "ყველა უფლება დაცულია.",
    built: "საქართველო · B2B IT გადაწყვეტილებები",
  },
  floats: {
    tg: "Telegram — ახალ ფანჯარაში იხსნება",
    wa: "WhatsApp — ახალ ფანჯარაში იხსნება",
  },
};

const en: Dict = {
  meta: {
    title: "Infra Core — Complete IT solutions for your office",
    description:
      "Infra Core — computers, networking, printers, Jabra headsets and software for business. Fast delivery, installation, official warranty.",
  },
  skip: "Skip to main content",
  nav: {
    products: "Products",
    services: "Services",
    why: "Why us",
    vendors: "Brands",
    process: "How we work",
    contact: "Contact",
    quote: "Request a quote",
  },
  hero: {
    eyebrow: "Complete IT solutions for business",
    title: "Everything your office runs on — supplied, set up, and supported.",
    sub: "Computers, networking, printers, Jabra headsets and software — with fast delivery, installation, and an official warranty.",
    cta1: "Request a quote",
    cta2: "Browse products",
    trust: ["Official warranty", "Fast delivery", "Competitive pricing"],
  },
  herocard: {
    label: "Office setup",
    rows: [
      "Workstations / Mini PC",
      "Network · Wi-Fi · switches",
      "Printers · peripherals",
      "Software · licensing",
      "Jabra headsets",
    ],
    turnkey: "All in one place — turnkey delivery",
  },
  what: {
    srTitle: "What we do",
    items: [
      { t: "One supplier for the whole office", d: "Hardware, networking, licensing and accessories — all in one place." },
      { t: "Delivery & deployment", d: "Fast delivery and installation — full office setup, turnkey." },
      { t: "Official warranty on everything", d: "Every piece of equipment comes with an official warranty." },
      { t: "Professional consultation & support", d: "We help you make the right choice and stay by your side." },
    ],
  },
  products: {
    eyebrow: "Products",
    title: "What we supply",
    lead: "Everything your office needs — in one place, with official warranty.",
    more: "See more",
    items: [
      { t: "Computers & Mini PCs", d: "PCs, Mini PCs, workstations and all-in-ones — including Beelink." },
      { t: "Monitors & accessories", d: "Monitors and accessories for the office." },
      { t: "Networking equipment", d: "Switches, routers and Wi-Fi solutions." },
      { t: "Printers & office hardware", d: "Printers, MFPs, scanners and office hardware." },
      { t: "Headsets & audio — Jabra", d: "Jabra headsets and other headphones for office and call-center." },
      { t: "Software & licensing", d: "Software and licensing for business." },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "More than just hardware",
    lead: "We supply, set up and look after your IT — so you can focus on your business.",
    items: [
      { t: "Official warranty", d: "Official warranty on all equipment." },
      { t: "Delivery & deployment", d: "Fast delivery, installation and full office setup — turnkey." },
      { t: "Consultation & support", d: "Professional consultation to help you choose, plus technical support." },
      { t: "IT infrastructure", d: "Backups, network modernization and preventive maintenance — prevention is cheaper than recovery." },
    ],
  },
  why: {
    eyebrow: "Why Infra Core",
    title: "Why businesses choose us",
    items: [
      { t: "One supplier for the whole office", d: "Hardware, networking, licensing and accessories — all in one place." },
      { t: "Competitive pricing", d: "Cost-effective pricing — from a small team to an entire corporate office." },
      { t: "End-to-end office setup", d: "From consultation to deployment and warranty — full service." },
    ],
  },
  vendors: {
    eyebrow: "Brands",
    title: "Brands we supply",
    brands: ["Beelink", "Jabra"],
    note: "All trademarks are the property of their respective owners. The full list of partner brands will be updated soon.",
  },
  process: {
    eyebrow: "How we work",
    title: "From empty office to fully equipped — in three steps",
    steps: [
      { t: "Consultation", d: "We understand your needs and recommend the right equipment." },
      { t: "Delivery & setup", d: "We deliver, set up the network, and configure computers and licenses." },
      { t: "Warranty & support", d: "We stay with you — with official warranty and technical support." },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Tell us what your office needs",
    lead: "Fill in the form and get a quote — we'll get back to you shortly.",
    city: "Georgia",
  },
  form: {
    name: "Name *",
    company: "Company",
    phone: "Phone *",
    email: "Email",
    sector: "Industry / sector",
    sectorPh: "e.g. legal, restaurant/food, retail, clinic…",
    message: "Message",
    messagePh: "How many workstations? What do you need?",
    consent: "I consent to the processing of my personal data in order to respond to this inquiry.",
    submit: "Get a quote",
    sending: "Sending…",
    ok: "Thank you! Your request was received — we'll be in touch shortly.",
    err: "Something went wrong. Please try again or call us.",
    required: "Please fill in the required fields.",
    consentErr: "Please agree to the processing of your data.",
    notConfigured:
      "The form is not configured yet (see README). In the meantime, email us: info@infracore-consulting.com",
  },
  footer: {
    tag: "One supplier for the whole office — hardware, networking, licensing and support.",
    products: "Products",
    services: "Services",
    contact: "Contact",
    productLinks: ["Computers & Mini PCs", "Networking", "Printers", "Software & licensing"],
    serviceLinks: ["Official warranty", "Delivery & deployment", "Consultation & support", "IT infrastructure"],
    rights: "All rights reserved.",
    built: "Georgia · B2B IT solutions",
  },
  floats: {
    tg: "Telegram — opens in a new tab",
    wa: "WhatsApp — opens in a new tab",
  },
};

export const dictionaries: Record<Lang, Dict> = { ka, en };
