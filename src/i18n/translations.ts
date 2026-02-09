export type Language = 'en' | 'hi' | 'mr' | 'ta';

export interface Translation {
  // Common
  common: {
    home: string;
    back: string;
    next: string;
    submit: string;
    cancel: string;
    loading: string;
    success: string;
    error: string;
    logout: string;
    login: string;
    signup: string;
    profile: string;
    search: string;
    selectLanguage: string;
  };
  // Navigation
  nav: {
    electricity: string;
    gas: string;
    municipal: string;
    emergency: string;
    dashboard: string;
  };
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  // Departments
  departments: {
    electricity: {
      title: string;
      description: string;
    };
    gas: {
      title: string;
      description: string;
    };
    municipal: {
      title: string;
      description: string;
    };
  };
  // Bills & Payments
  payments: {
    billPayment: string;
    payNow: string;
    scanQR: string;
    upiId: string;
    amount: string;
    dueDate: string;
    billNumber: string;
    paymentSuccess: string;
    paymentPending: string;
    downloadReceipt: string;
    printReceipt: string;
    transactionId: string;
  };
  // Documents
  documents: {
    upload: string;
    uploadDocument: string;
    selectType: string;
    idProof: string;
    addressProof: string;
    meterPhoto: string;
    billCopy: string;
    other: string;
    dragDrop: string;
    maxSize: string;
    uploaded: string;
    uploadSuccess: string;
  };
  // Complaints
  complaints: {
    title: string;
    fileComplaint: string;
    yourComplaints: string;
    issueType: string;
    description: string;
    status: string;
    submitted: string;
    inProgress: string;
    resolved: string;
    complaintId: string;
  };
  // Stats
  stats: {
    activeComplaints: string;
    inProgress: string;
    resolved: string;
    pendingDues: string;
    balance: string;
    validUntil: string;
    lastRecharge: string;
    rechargeNow: string;
  };
  // Emergency
  emergency: {
    title: string;
    description: string;
    helpline: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    common: {
      home: 'Home',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      cancel: 'Cancel',
      loading: 'Loading...',
      success: 'Success!',
      error: 'Error',
      logout: 'Logout',
      login: 'Login',
      signup: 'Sign Up',
      profile: 'Profile',
      search: 'Search',
      selectLanguage: 'Select Language',
    },
    nav: {
      electricity: 'Electricity',
      gas: 'Gas',
      municipal: 'Municipal',
      emergency: 'Emergency',
      dashboard: 'Dashboard',
    },
    hero: {
      title: 'नागरिक सेवा',
      subtitle: 'Citizen Services Portal',
      description: 'Access all essential public services in one place. Pay bills, file complaints, and stay updated with government services.',
    },
    departments: {
      electricity: {
        title: 'Electricity',
        description: 'Pay bills, check balance, report outages and manage your electricity connection',
      },
      gas: {
        title: 'Gas',
        description: 'Book cylinders, track delivery, manage LPG connection and report issues',
      },
      municipal: {
        title: 'Municipal',
        description: 'Access civic services, pay property tax, track development work in your area',
      },
    },
    payments: {
      billPayment: 'Bill Payment',
      payNow: 'Pay Now',
      scanQR: 'Scan QR to Pay',
      upiId: 'UPI ID',
      amount: 'Amount',
      dueDate: 'Due Date',
      billNumber: 'Bill Number',
      paymentSuccess: 'Payment Successful!',
      paymentPending: 'Payment Pending',
      downloadReceipt: 'Download Receipt',
      printReceipt: 'Print Receipt',
      transactionId: 'Transaction ID',
    },
    documents: {
      upload: 'Upload',
      uploadDocument: 'Upload Document',
      selectType: 'Select Document Type',
      idProof: 'ID Proof',
      addressProof: 'Address Proof',
      meterPhoto: 'Meter Photo',
      billCopy: 'Bill Copy',
      other: 'Other',
      dragDrop: 'Drag and drop or click to upload',
      maxSize: 'Max file size: 5MB',
      uploaded: 'Uploaded',
      uploadSuccess: 'Document uploaded successfully!',
    },
    complaints: {
      title: 'Complaints',
      fileComplaint: 'File a Complaint',
      yourComplaints: 'Your Complaints',
      issueType: 'Issue Type',
      description: 'Description',
      status: 'Status',
      submitted: 'Submitted',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      complaintId: 'Complaint ID',
    },
    stats: {
      activeComplaints: 'Active Complaints',
      inProgress: 'In Progress',
      resolved: 'Resolved (30d)',
      pendingDues: 'Pending Dues',
      balance: 'Current Balance',
      validUntil: 'Valid until',
      lastRecharge: 'Last Recharge',
      rechargeNow: 'Recharge Now',
    },
    emergency: {
      title: 'Need Emergency Help?',
      description: 'Quick access to all emergency helplines and safety information',
      helpline: 'Emergency Contacts',
    },
  },
  hi: {
    common: {
      home: 'होम',
      back: 'वापस',
      next: 'आगे',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      loading: 'लोड हो रहा है...',
      success: 'सफल!',
      error: 'त्रुटि',
      logout: 'लॉग आउट',
      login: 'लॉग इन',
      signup: 'साइन अप',
      profile: 'प्रोफ़ाइल',
      search: 'खोजें',
      selectLanguage: 'भाषा चुनें',
    },
    nav: {
      electricity: 'बिजली',
      gas: 'गैस',
      municipal: 'नगर निगम',
      emergency: 'आपातकाल',
      dashboard: 'डैशबोर्ड',
    },
    hero: {
      title: 'नागरिक सेवा',
      subtitle: 'नागरिक सेवा पोर्टल',
      description: 'सभी आवश्यक सार्वजनिक सेवाओं को एक ही स्थान पर प्राप्त करें। बिल भुगतान करें, शिकायत दर्ज करें, और सरकारी सेवाओं से अपडेट रहें।',
    },
    departments: {
      electricity: {
        title: 'बिजली',
        description: 'बिल भुगतान करें, बैलेंस जांचें, आउटेज की रिपोर्ट करें और अपना बिजली कनेक्शन प्रबंधित करें',
      },
      gas: {
        title: 'गैस',
        description: 'सिलेंडर बुक करें, डिलीवरी ट्रैक करें, LPG कनेक्शन प्रबंधित करें और समस्याओं की रिपोर्ट करें',
      },
      municipal: {
        title: 'नगर निगम',
        description: 'नागरिक सेवाओं तक पहुंचें, संपत्ति कर का भुगतान करें, अपने क्षेत्र में विकास कार्य ट्रैक करें',
      },
    },
    payments: {
      billPayment: 'बिल भुगतान',
      payNow: 'अभी भुगतान करें',
      scanQR: 'भुगतान के लिए QR स्कैन करें',
      upiId: 'UPI आईडी',
      amount: 'राशि',
      dueDate: 'देय तिथि',
      billNumber: 'बिल नंबर',
      paymentSuccess: 'भुगतान सफल!',
      paymentPending: 'भुगतान लंबित',
      downloadReceipt: 'रसीद डाउनलोड करें',
      printReceipt: 'रसीद प्रिंट करें',
      transactionId: 'लेनदेन आईडी',
    },
    documents: {
      upload: 'अपलोड',
      uploadDocument: 'दस्तावेज़ अपलोड करें',
      selectType: 'दस्तावेज़ प्रकार चुनें',
      idProof: 'पहचान प्रमाण',
      addressProof: 'पता प्रमाण',
      meterPhoto: 'मीटर फोटो',
      billCopy: 'बिल कॉपी',
      other: 'अन्य',
      dragDrop: 'अपलोड करने के लिए ड्रैग और ड्रॉप करें या क्लिक करें',
      maxSize: 'अधिकतम फ़ाइल आकार: 5MB',
      uploaded: 'अपलोड किया गया',
      uploadSuccess: 'दस्तावेज़ सफलतापूर्वक अपलोड हो गया!',
    },
    complaints: {
      title: 'शिकायतें',
      fileComplaint: 'शिकायत दर्ज करें',
      yourComplaints: 'आपकी शिकायतें',
      issueType: 'समस्या का प्रकार',
      description: 'विवरण',
      status: 'स्थिति',
      submitted: 'जमा किया गया',
      inProgress: 'प्रगति में',
      resolved: 'हल किया गया',
      complaintId: 'शिकायत आईडी',
    },
    stats: {
      activeComplaints: 'सक्रिय शिकायतें',
      inProgress: 'प्रगति में',
      resolved: 'हल (30 दिन)',
      pendingDues: 'बकाया राशि',
      balance: 'वर्तमान बैलेंस',
      validUntil: 'वैध तक',
      lastRecharge: 'अंतिम रिचार्ज',
      rechargeNow: 'अभी रिचार्ज करें',
    },
    emergency: {
      title: 'आपातकालीन मदद चाहिए?',
      description: 'सभी आपातकालीन हेल्पलाइन और सुरक्षा जानकारी तक त्वरित पहुंच',
      helpline: 'आपातकालीन संपर्क',
    },
  },
  mr: {
    common: {
      home: 'होम',
      back: 'मागे',
      next: 'पुढे',
      submit: 'सबमिट करा',
      cancel: 'रद्द करा',
      loading: 'लोड होत आहे...',
      success: 'यशस्वी!',
      error: 'त्रुटी',
      logout: 'लॉग आउट',
      login: 'लॉग इन',
      signup: 'साइन अप',
      profile: 'प्रोफाइल',
      search: 'शोधा',
      selectLanguage: 'भाषा निवडा',
    },
    nav: {
      electricity: 'वीज',
      gas: 'गॅस',
      municipal: 'महानगरपालिका',
      emergency: 'आणीबाणी',
      dashboard: 'डॅशबोर्ड',
    },
    hero: {
      title: 'नागरिक सेवा',
      subtitle: 'नागरिक सेवा पोर्टल',
      description: 'सर्व आवश्यक सार्वजनिक सेवा एकाच ठिकाणी मिळवा. बिल भरा, तक्रार नोंदवा आणि सरकारी सेवांशी अद्ययावत रहा.',
    },
    departments: {
      electricity: {
        title: 'वीज',
        description: 'बिल भरा, बॅलन्स तपासा, आउटेजची माहिती द्या आणि तुमचे वीज कनेक्शन व्यवस्थापित करा',
      },
      gas: {
        title: 'गॅस',
        description: 'सिलिंडर बुक करा, डिलिव्हरी ट्रॅक करा, LPG कनेक्शन व्यवस्थापित करा आणि समस्या नोंदवा',
      },
      municipal: {
        title: 'महानगरपालिका',
        description: 'नागरी सेवांमध्ये प्रवेश करा, मालमत्ता कर भरा, तुमच्या क्षेत्रातील विकास कार्य ट्रॅक करा',
      },
    },
    payments: {
      billPayment: 'बिल पेमेंट',
      payNow: 'आता पैसे द्या',
      scanQR: 'पेमेंटसाठी QR स्कॅन करा',
      upiId: 'UPI आयडी',
      amount: 'रक्कम',
      dueDate: 'देय तारीख',
      billNumber: 'बिल क्रमांक',
      paymentSuccess: 'पेमेंट यशस्वी!',
      paymentPending: 'पेमेंट प्रलंबित',
      downloadReceipt: 'पावती डाउनलोड करा',
      printReceipt: 'पावती प्रिंट करा',
      transactionId: 'व्यवहार आयडी',
    },
    documents: {
      upload: 'अपलोड',
      uploadDocument: 'दस्तऐवज अपलोड करा',
      selectType: 'दस्तऐवज प्रकार निवडा',
      idProof: 'ओळख पुरावा',
      addressProof: 'पत्ता पुरावा',
      meterPhoto: 'मीटर फोटो',
      billCopy: 'बिल कॉपी',
      other: 'इतर',
      dragDrop: 'अपलोड करण्यासाठी ड्रॅग आणि ड्रॉप करा किंवा क्लिक करा',
      maxSize: 'कमाल फाइल आकार: 5MB',
      uploaded: 'अपलोड झाले',
      uploadSuccess: 'दस्तऐवज यशस्वीरित्या अपलोड झाला!',
    },
    complaints: {
      title: 'तक्रारी',
      fileComplaint: 'तक्रार नोंदवा',
      yourComplaints: 'तुमच्या तक्रारी',
      issueType: 'समस्येचा प्रकार',
      description: 'वर्णन',
      status: 'स्थिती',
      submitted: 'सबमिट केले',
      inProgress: 'प्रगतीपथावर',
      resolved: 'निराकरण झाले',
      complaintId: 'तक्रार आयडी',
    },
    stats: {
      activeComplaints: 'सक्रिय तक्रारी',
      inProgress: 'प्रगतीपथावर',
      resolved: 'निराकरण (30 दिवस)',
      pendingDues: 'थकबाकी',
      balance: 'सध्याचे बॅलन्स',
      validUntil: 'पर्यंत वैध',
      lastRecharge: 'शेवटचे रिचार्ज',
      rechargeNow: 'आता रिचार्ज करा',
    },
    emergency: {
      title: 'आणीबाणीची मदत हवी आहे?',
      description: 'सर्व आणीबाणी हेल्पलाइन आणि सुरक्षा माहितीमध्ये त्वरित प्रवेश',
      helpline: 'आणीबाणी संपर्क',
    },
  },
  ta: {
    common: {
      home: 'முகப்பு',
      back: 'பின்',
      next: 'அடுத்து',
      submit: 'சமர்ப்பி',
      cancel: 'ரத்து',
      loading: 'ஏற்றுகிறது...',
      success: 'வெற்றி!',
      error: 'பிழை',
      logout: 'வெளியேறு',
      login: 'உள்நுழை',
      signup: 'பதிவு செய்',
      profile: 'சுயவிவரம்',
      search: 'தேடு',
      selectLanguage: 'மொழியை தேர்ந்தெடு',
    },
    nav: {
      electricity: 'மின்சாரம்',
      gas: 'எரிவாயு',
      municipal: 'நகராட்சி',
      emergency: 'அவசரநிலை',
      dashboard: 'டாஷ்போர்டு',
    },
    hero: {
      title: 'नागरिक सेवा',
      subtitle: 'குடிமக்கள் சேவை போர்டல்',
      description: 'அனைத்து அத்தியாவசிய பொது சேவைகளையும் ஒரே இடத்தில் அணுகுங்கள். பில்கள் செலுத்துங்கள், புகார்களை பதிவு செய்யுங்கள், அரசு சேவைகளுடன் புதுப்பிப்பாக இருங்கள்.',
    },
    departments: {
      electricity: {
        title: 'மின்சாரம்',
        description: 'பில் செலுத்துங்கள், இருப்பை சரிபார்க்கவும், மின்தடையை புகாரளிக்கவும், உங்கள் மின் இணைப்பை நிர்வகிக்கவும்',
      },
      gas: {
        title: 'எரிவாயு',
        description: 'சிலிண்டர் புக் செய்யுங்கள், டெலிவரியை கண்காணிக்கவும், LPG இணைப்பை நிர்வகிக்கவும், பிரச்சனைகளை புகாரளிக்கவும்',
      },
      municipal: {
        title: 'நகராட்சி',
        description: 'குடிமை சேவைகளை அணுகுங்கள், சொத்து வரி செலுத்துங்கள், உங்கள் பகுதியில் வளர்ச்சி பணிகளை கண்காணிக்கவும்',
      },
    },
    payments: {
      billPayment: 'பில் செலுத்தம்',
      payNow: 'இப்போது செலுத்து',
      scanQR: 'செலுத்த QR ஸ்கேன் செய்யுங்கள்',
      upiId: 'UPI ஐடி',
      amount: 'தொகை',
      dueDate: 'நிலுவை தேதி',
      billNumber: 'பில் எண்',
      paymentSuccess: 'செலுத்தம் வெற்றி!',
      paymentPending: 'செலுத்தம் நிலுவையில்',
      downloadReceipt: 'ரசீதை பதிவிறக்கு',
      printReceipt: 'ரசீதை அச்சிடு',
      transactionId: 'பரிவர்த்தனை ஐடி',
    },
    documents: {
      upload: 'பதிவேற்று',
      uploadDocument: 'ஆவணத்தை பதிவேற்று',
      selectType: 'ஆவண வகையை தேர்வு செய்யவும்',
      idProof: 'அடையாள சான்று',
      addressProof: 'முகவரி சான்று',
      meterPhoto: 'மீட்டர் புகைப்படம்',
      billCopy: 'பில் நகல்',
      other: 'மற்றவை',
      dragDrop: 'இழுத்து விடவும் அல்லது பதிவேற்ற கிளிக் செய்யவும்',
      maxSize: 'அதிகபட்ச கோப்பு அளவு: 5MB',
      uploaded: 'பதிவேற்றப்பட்டது',
      uploadSuccess: 'ஆவணம் வெற்றிகரமாக பதிவேற்றப்பட்டது!',
    },
    complaints: {
      title: 'புகார்கள்',
      fileComplaint: 'புகார் பதிவு செய்',
      yourComplaints: 'உங்கள் புகார்கள்',
      issueType: 'பிரச்சனை வகை',
      description: 'விளக்கம்',
      status: 'நிலை',
      submitted: 'சமர்ப்பிக்கப்பட்டது',
      inProgress: 'செயலில்',
      resolved: 'தீர்க்கப்பட்டது',
      complaintId: 'புகார் ஐடி',
    },
    stats: {
      activeComplaints: 'செயலில் உள்ள புகார்கள்',
      inProgress: 'செயலில்',
      resolved: 'தீர்க்கப்பட்டது (30 நாட்கள்)',
      pendingDues: 'நிலுவை தொகை',
      balance: 'தற்போதைய இருப்பு',
      validUntil: 'வரை செல்லுபடியாகும்',
      lastRecharge: 'கடைசி ரீசார்ஜ்',
      rechargeNow: 'இப்போது ரீசார்ஜ் செய்',
    },
    emergency: {
      title: 'அவசர உதவி தேவையா?',
      description: 'அனைத்து அவசர ஹெல்ப்லைன் மற்றும் பாதுகாப்பு தகவல்களுக்கு விரைவான அணுகல்',
      helpline: 'அவசர தொடர்புகள்',
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
  ta: 'தமிழ்',
};
