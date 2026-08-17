import React, { useState } from "react";
import "./EmailWriter.css";

const API_BASE_URL = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}`.replace(/\/$/, "") + "/api";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ் · Tamil" },
  { code: "hi", label: "हिन्दी · Hindi" },
  { code: "te", label: "తెలుగు · Telugu" },
  { code: "kn", label: "ಕನ್ನಡ · Kannada" },
  { code: "ml", label: "മലയാളം · Malayalam" },
  { code: "bn", label: "বাংলা · Bengali" },
  { code: "mr", label: "मराठी · Marathi" },
  { code: "es", label: "Español · Spanish" },
  { code: "fr", label: "Français · French" },
  { code: "ar", label: "العربية · Arabic" },
  { code: "zh", label: "中文 · Chinese" },
  { code: "pt", label: "Português · Portuguese" },
];

const UI_TEXT = {
  en: {
    badge: "✉️ AI Email Writer",
    title1: "Write Emails with",
    title2: "AI Help",
    subtitle: "Tell us what email you need — AI will draft a ready-to-send version. Copy it and paste into your email app.",
    promptLabel: "What email do you need? (prompt)",
    promptPlaceholder: "Eg: A leave request email to my manager, saying I'm sick tomorrow",
    uiLanguageLabel: "Interface Language",
    emailLanguageLabel: "Email Language",
    toneLabel: "Tone",
    tones: { professional: "Professional", friendly: "Friendly", formal: "Formal", apologetic: "Apologetic" },
    generateBtn: "✨ Generate Email",
    generating: "Generating...",
    subjectLabel: "Subject",
    bodyLabel: "Body",
    copyBtn: "📋 Copy Email",
    resultBadge: "Generated Email",
    emptyPrompt: "Please type what email you need.",
    copiedMsg: "✅ Copied! Paste it into your Gmail/Outlook.",
    serverError: "Server error - please try again.",
    genError: "Could not generate the email.",
  },
  ta: {
    badge: "✉️ AI ஈமெயில் எழுத்தாளர்",
    title1: "AI உதவியுடன்",
    title2: "ஈமெயில் எழுதுங்கள்",
    subtitle: "உங்களுக்கு என்ன ஈமெயில் வேண்டுமோ சொல்லுங்கள் — AI உடனடியாக அனுப்பக்கூடிய வரைவை தயார் செய்யும். காப்பி செய்து உங்கள் ஈமெயில் ஆப்-ல் ஒட்டுங்கள்.",
    promptLabel: "என்ன ஈமெயில் வேண்டும்? (prompt)",
    promptPlaceholder: "எ.கா: மேலாளருக்கு விடுப்பு கேட்கும் ஈமெயில், நாளை உடல்நலம் சரியில்லை என்று சொல்ல வேண்டும்",
    uiLanguageLabel: "இடைமுக மொழி",
    emailLanguageLabel: "ஈமெயில் மொழி",
    toneLabel: "தொனி",
    tones: { professional: "தொழில்முறை", friendly: "நட்பான", formal: "முறையான", apologetic: "மன்னிப்புக் கோரும்" },
    generateBtn: "✨ ஈமெயில் உருவாக்கு",
    generating: "உருவாக்குகிறது...",
    subjectLabel: "பொருள்",
    bodyLabel: "உள்ளடக்கம்",
    copyBtn: "📋 ஈமெயில் காப்பி செய்",
    resultBadge: "உருவாக்கப்பட்ட ஈமெயில்",
    emptyPrompt: "என்ன ஈமெயில் வேண்டும் என்று டைப் செய்யுங்கள்.",
    copiedMsg: "✅ காப்பி ஆனது! உங்கள் Gmail/Outlook-ல் ஒட்டுங்கள்.",
    serverError: "சர்வர் பிழை - மீண்டும் முயற்சிக்கவும்.",
    genError: "ஈமெயில் உருவாக்க முடியவில்லை.",
  },
  hi: {
    badge: "✉️ AI ईमेल लेखक",
    title1: "AI की मदद से",
    title2: "ईमेल लिखें",
    subtitle: "बताएं आपको कौन सा ईमेल चाहिए — AI तुरंत भेजने लायक ड्राफ्ट तैयार कर देगा। कॉपी करके अपने ईमेल ऐप में पेस्ट करें।",
    promptLabel: "कौन सा ईमेल चाहिए? (प्रॉम्प्ट)",
    promptPlaceholder: "उदा: मैनेजर को छुट्टी के लिए ईमेल, कल बीमार होने की बात कहनी है",
    uiLanguageLabel: "इंटरफ़ेस भाषा",
    emailLanguageLabel: "ईमेल भाषा",
    toneLabel: "लहजा",
    tones: { professional: "पेशेवर", friendly: "मित्रवत", formal: "औपचारिक", apologetic: "माफी वाला" },
    generateBtn: "✨ ईमेल बनाएं",
    generating: "बन रहा है...",
    subjectLabel: "विषय",
    bodyLabel: "मुख्य भाग",
    copyBtn: "📋 ईमेल कॉपी करें",
    resultBadge: "बना हुआ ईमेल",
    emptyPrompt: "कृपया बताएं आपको कौन सा ईमेल चाहिए.",
    copiedMsg: "✅ कॉपी हो गया! अपने Gmail/Outlook में पेस्ट करें।",
    serverError: "सर्वर त्रुटि - कृपया दोबारा प्रयास करें।",
    genError: "ईमेल नहीं बन सका।",
  },
  te: {
    badge: "✉️ AI ఈమెయిల్ రచయిత",
    title1: "AI సహాయంతో",
    title2: "ఈమెయిల్ రాయండి",
    subtitle: "మీకు ఏ ఈమెయిల్ కావాలో చెప్పండి — AI వెంటనే పంపగలిగే డ్రాఫ్ట్ తయారు చేస్తుంది. కాపీ చేసి మీ ఈమెయిల్ యాప్‌లో పేస్ట్ చేయండి.",
    promptLabel: "ఏ ఈమెయిల్ కావాలి? (ప్రాంప్ట్)",
    promptPlaceholder: "ఉదా: మేనేజర్‌కు లీవ్ రిక్వెస్ట్ ఈమెయిల్, రేపు జబ్బు అని చెప్పాలి",
    uiLanguageLabel: "ఇంటర్‌ఫేస్ భాష",
    emailLanguageLabel: "ఈమెయిల్ భాష",
    toneLabel: "టోన్",
    tones: { professional: "ప్రొఫెషనల్", friendly: "స్నేహపూర్వక", formal: "అధికారిక", apologetic: "క్షమాపణ" },
    generateBtn: "✨ ఈమెయిల్ తయారు చేయి",
    generating: "తయారవుతోంది...",
    subjectLabel: "విషయం",
    bodyLabel: "వివరణ",
    copyBtn: "📋 ఈమెయిల్ కాపీ చేయి",
    resultBadge: "తయారైన ఈమెయిల్",
    emptyPrompt: "మీకు ఏ ఈమెయిల్ కావాలో టైప్ చేయండి.",
    copiedMsg: "✅ కాపీ అయింది! మీ Gmail/Outlook‌లో పేస్ట్ చేయండి.",
    serverError: "సర్వర్ లోపం - దయచేసి మళ్లీ ప్రయత్నించండి.",
    genError: "ఈమెయిల్ తయారు చేయలేకపోయాము.",
  },
  kn: {
    badge: "✉️ AI ಇಮೇಲ್ ಬರಹಗಾರ",
    title1: "AI ಸಹಾಯದೊಂದಿಗೆ",
    title2: "ಇಮೇಲ್ ಬರೆಯಿರಿ",
    subtitle: "ನಿಮಗೆ ಯಾವ ಇಮೇಲ್ ಬೇಕು ಎಂದು ಹೇಳಿ — AI ತಕ್ಷಣ ಕಳುಹಿಸಬಹುದಾದ ಡ್ರಾಫ್ಟ್ ಸಿದ್ಧಪಡಿಸುತ್ತದೆ. ನಕಲಿಸಿ ನಿಮ್ಮ ಇಮೇಲ್ ಆ್ಯಪ್‌ನಲ್ಲಿ ಅಂಟಿಸಿ.",
    promptLabel: "ಯಾವ ಇಮೇಲ್ ಬೇಕು? (ಪ್ರಾಂಪ್ಟ್)",
    promptPlaceholder: "ಉದಾ: ಮ್ಯಾನೇಜರ್‌ಗೆ ರಜೆ ಕೋರಿಕೆ ಇಮೇಲ್, ನಾಳೆ ಅನಾರೋಗ್ಯ ಎಂದು ಹೇಳಬೇಕು",
    uiLanguageLabel: "ಇಂಟರ್ಫೇಸ್ ಭಾಷೆ",
    emailLanguageLabel: "ಇಮೇಲ್ ಭಾಷೆ",
    toneLabel: "ಧ್ವನಿ",
    tones: { professional: "ವೃತ್ತಿಪರ", friendly: "ಸ್ನೇಹಪರ", formal: "ಔಪಚಾರಿಕ", apologetic: "ಕ್ಷಮೆಯಾಚನೆ" },
    generateBtn: "✨ ಇಮೇಲ್ ರಚಿಸಿ",
    generating: "ರಚಿಸಲಾಗುತ್ತಿದೆ...",
    subjectLabel: "ವಿಷಯ",
    bodyLabel: "ವಿವರ",
    copyBtn: "📋 ಇಮೇಲ್ ನಕಲಿಸಿ",
    resultBadge: "ರಚಿಸಲಾದ ಇಮೇಲ್",
    emptyPrompt: "ನಿಮಗೆ ಯಾವ ಇಮೇಲ್ ಬೇಕು ಎಂದು ಟೈಪ್ ಮಾಡಿ.",
    copiedMsg: "✅ ನಕಲಿಸಲಾಗಿದೆ! ನಿಮ್ಮ Gmail/Outlook‌ನಲ್ಲಿ ಅಂಟಿಸಿ.",
    serverError: "ಸರ್ವರ್ ದೋಷ - ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    genError: "ಇಮೇಲ್ ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
  },
  ml: {
    badge: "✉️ AI ഇമെയിൽ എഴുത്തുകാരൻ",
    title1: "AI സഹായത്തോടെ",
    title2: "ഇമെയിൽ എഴുതൂ",
    subtitle: "നിങ്ങൾക്ക് ഏത് ഇമെയിൽ വേണമെന്ന് പറയൂ — AI ഉടൻ അയക്കാവുന്ന ഡ്രാഫ്റ്റ് തയ്യാറാക്കും. കോപ്പി ചെയ്ത് നിങ്ങളുടെ ഇമെയിൽ ആപ്പിൽ പേസ്റ്റ് ചെയ്യൂ.",
    promptLabel: "ഏത് ഇമെയിൽ വേണം? (പ്രോംപ്റ്റ്)",
    promptPlaceholder: "ഉദാ: മാനേജർക്ക് അവധി അപേക്ഷ ഇമെയിൽ, നാളെ അസുഖം എന്ന് പറയണം",
    uiLanguageLabel: "ഇന്റർഫേസ് ഭാഷ",
    emailLanguageLabel: "ഇമെയിൽ ഭാഷ",
    toneLabel: "ടോൺ",
    tones: { professional: "പ്രൊഫഷണൽ", friendly: "സൗഹൃദപരം", formal: "ഔപചാരികം", apologetic: "ക്ഷമാപണം" },
    generateBtn: "✨ ഇമെയിൽ തയ്യാറാക്കൂ",
    generating: "തയ്യാറാക്കുന്നു...",
    subjectLabel: "വിഷയം",
    bodyLabel: "ഉള്ളടക്കം",
    copyBtn: "📋 ഇമെയിൽ കോപ്പി ചെയ്യൂ",
    resultBadge: "തയ്യാറാക്കിയ ഇമെയിൽ",
    emptyPrompt: "നിങ്ങൾക്ക് ഏത് ഇമെയിൽ വേണമെന്ന് ടൈപ്പ് ചെയ്യൂ.",
    copiedMsg: "✅ കോപ്പി ചെയ്തു! നിങ്ങളുടെ Gmail/Outlook-ൽ പേസ്റ്റ് ചെയ്യൂ.",
    serverError: "സെർവർ പിശക് - ദയവായി വീണ്ടും ശ്രമിക്കൂ.",
    genError: "ഇമെയിൽ തയ്യാറാക്കാൻ കഴിഞ്ഞില്ല.",
  },
  bn: {
    badge: "✉️ AI ইমেইল লেখক",
    title1: "AI সাহায্যে",
    title2: "ইমেইল লিখুন",
    subtitle: "আপনার কোন ইমেইল দরকার বলুন — AI সাথে সাথে পাঠানোর মতো খসড়া তৈরি করে দেবে। কপি করে আপনার ইমেইল অ্যাপে পেস্ট করুন।",
    promptLabel: "কোন ইমেইল দরকার? (প্রম্পট)",
    promptPlaceholder: "উদা: ম্যানেজারকে ছুটির অনুরোধের ইমেইল, আগামীকাল অসুস্থ বলতে হবে",
    uiLanguageLabel: "ইন্টারফেস ভাষা",
    emailLanguageLabel: "ইমেইল ভাষা",
    toneLabel: "টোন",
    tones: { professional: "পেশাদার", friendly: "বন্ধুত্বপূর্ণ", formal: "আনুষ্ঠানিক", apologetic: "ক্ষমাপ্রার্থী" },
    generateBtn: "✨ ইমেইল তৈরি করুন",
    generating: "তৈরি হচ্ছে...",
    subjectLabel: "বিষয়",
    bodyLabel: "মূল অংশ",
    copyBtn: "📋 ইমেইল কপি করুন",
    resultBadge: "তৈরি করা ইমেইল",
    emptyPrompt: "আপনার কোন ইমেইল দরকার তা টাইপ করুন।",
    copiedMsg: "✅ কপি হয়েছে! আপনার Gmail/Outlook-এ পেস্ট করুন।",
    serverError: "সার্ভার ত্রুটি - অনুগ্রহ করে আবার চেষ্টা করুন।",
    genError: "ইমেইল তৈরি করা যায়নি।",
  },
  mr: {
    badge: "✉️ AI ईमेल लेखक",
    title1: "AI च्या मदतीने",
    title2: "ईमेल लिहा",
    subtitle: "तुम्हाला कोणता ईमेल हवा आहे ते सांगा — AI लगेच पाठवण्यायोग्य मसुदा तयार करेल. कॉपी करून तुमच्या ईमेल अॅपमध्ये पेस्ट करा.",
    promptLabel: "कोणता ईमेल हवा आहे? (प्रॉम्प्ट)",
    promptPlaceholder: "उदा: मॅनेजरला रजेसाठी ईमेल, उद्या आजारी असल्याचे सांगायचे आहे",
    uiLanguageLabel: "इंटरफेस भाषा",
    emailLanguageLabel: "ईमेल भाषा",
    toneLabel: "टोन",
    tones: { professional: "व्यावसायिक", friendly: "मैत्रीपूर्ण", formal: "औपचारिक", apologetic: "क्षमायाचना" },
    generateBtn: "✨ ईमेल तयार करा",
    generating: "तयार होत आहे...",
    subjectLabel: "विषय",
    bodyLabel: "मजकूर",
    copyBtn: "📋 ईमेल कॉपी करा",
    resultBadge: "तयार केलेला ईमेल",
    emptyPrompt: "तुम्हाला कोणता ईमेल हवा आहे ते टाइप करा.",
    copiedMsg: "✅ कॉपी झाले! तुमच्या Gmail/Outlook मध्ये पेस्ट करा.",
    serverError: "सर्व्हर त्रुटी - कृपया पुन्हा प्रयत्न करा.",
    genError: "ईमेल तयार करता आला नाही.",
  },
  es: {
    badge: "✉️ Redactor de Correos IA",
    title1: "Escribe Correos con",
    title2: "Ayuda de IA",
    subtitle: "Dinos qué correo necesitas — la IA redactará una versión lista para enviar. Cópiala y pégala en tu app de correo.",
    promptLabel: "¿Qué correo necesitas? (instrucción)",
    promptPlaceholder: "Ej: Un correo de solicitud de permiso a mi jefe, diciendo que estoy enfermo mañana",
    uiLanguageLabel: "Idioma de la Interfaz",
    emailLanguageLabel: "Idioma del Correo",
    toneLabel: "Tono",
    tones: { professional: "Profesional", friendly: "Amistoso", formal: "Formal", apologetic: "Disculpa" },
    generateBtn: "✨ Generar Correo",
    generating: "Generando...",
    subjectLabel: "Asunto",
    bodyLabel: "Cuerpo",
    copyBtn: "📋 Copiar Correo",
    resultBadge: "Correo Generado",
    emptyPrompt: "Por favor escribe qué correo necesitas.",
    copiedMsg: "✅ ¡Copiado! Pégalo en tu Gmail/Outlook.",
    serverError: "Error del servidor - inténtalo de nuevo.",
    genError: "No se pudo generar el correo.",
  },
  fr: {
    badge: "✉️ Rédacteur d'E-mails IA",
    title1: "Rédigez des E-mails avec",
    title2: "l'Aide de l'IA",
    subtitle: "Dites-nous quel e-mail vous voulez — l'IA rédigera une version prête à envoyer. Copiez-la et collez-la dans votre application de messagerie.",
    promptLabel: "Quel e-mail voulez-vous ? (invite)",
    promptPlaceholder: "Ex : Un e-mail de demande de congé à mon manager, disant que je suis malade demain",
    uiLanguageLabel: "Langue de l'Interface",
    emailLanguageLabel: "Langue de l'E-mail",
    toneLabel: "Ton",
    tones: { professional: "Professionnel", friendly: "Amical", formal: "Formel", apologetic: "Excuse" },
    generateBtn: "✨ Générer l'E-mail",
    generating: "Génération...",
    subjectLabel: "Objet",
    bodyLabel: "Corps",
    copyBtn: "📋 Copier l'E-mail",
    resultBadge: "E-mail Généré",
    emptyPrompt: "Veuillez indiquer quel e-mail vous voulez.",
    copiedMsg: "✅ Copié ! Collez-le dans votre Gmail/Outlook.",
    serverError: "Erreur du serveur - veuillez réessayer.",
    genError: "Impossible de générer l'e-mail.",
  },
  ar: {
    badge: "✉️ كاتب البريد الإلكتروني بالذكاء الاصطناعي",
    title1: "اكتب رسائل بريد إلكتروني",
    title2: "بمساعدة الذكاء الاصطناعي",
    subtitle: "أخبرنا بالبريد الإلكتروني الذي تحتاجه — سيقوم الذكاء الاصطناعي بإعداد مسودة جاهزة للإرسال. انسخها والصقها في تطبيق البريد الإلكتروني الخاص بك.",
    promptLabel: "ما البريد الإلكتروني الذي تحتاجه؟",
    promptPlaceholder: "مثال: بريد إلكتروني لطلب إجازة إلى مديري، أخبره أنني مريض غدًا",
    uiLanguageLabel: "لغة الواجهة",
    emailLanguageLabel: "لغة البريد الإلكتروني",
    toneLabel: "النبرة",
    tones: { professional: "احترافي", friendly: "ودّي", formal: "رسمي", apologetic: "اعتذاري" },
    generateBtn: "✨ إنشاء البريد الإلكتروني",
    generating: "جارٍ الإنشاء...",
    subjectLabel: "الموضوع",
    bodyLabel: "النص",
    copyBtn: "📋 نسخ البريد الإلكتروني",
    resultBadge: "البريد الإلكتروني الذي تم إنشاؤه",
    emptyPrompt: "الرجاء كتابة البريد الإلكتروني الذي تحتاجه.",
    copiedMsg: "✅ تم النسخ! الصقه في Gmail/Outlook الخاص بك.",
    serverError: "خطأ في الخادم - يرجى المحاولة مرة أخرى.",
    genError: "تعذر إنشاء البريد الإلكتروني.",
  },
  zh: {
    badge: "✉️ AI 邮件写手",
    title1: "借助 AI",
    title2: "撰写邮件",
    subtitle: "告诉我们你需要什么邮件 — AI 会起草一份可以直接发送的版本。复制后粘贴到你的邮件应用中。",
    promptLabel: "你需要什么邮件？（提示）",
    promptPlaceholder: "例如：给经理写一封请假邮件，说明天生病",
    uiLanguageLabel: "界面语言",
    emailLanguageLabel: "邮件语言",
    toneLabel: "语气",
    tones: { professional: "专业", friendly: "友好", formal: "正式", apologetic: "道歉" },
    generateBtn: "✨ 生成邮件",
    generating: "生成中...",
    subjectLabel: "主题",
    bodyLabel: "正文",
    copyBtn: "📋 复制邮件",
    resultBadge: "已生成邮件",
    emptyPrompt: "请输入你需要的邮件内容。",
    copiedMsg: "✅ 已复制！粘贴到你的 Gmail/Outlook 中。",
    serverError: "服务器错误 - 请重试。",
    genError: "无法生成邮件。",
  },
  pt: {
    badge: "✉️ Redator de E-mails IA",
    title1: "Escreva E-mails com",
    title2: "Ajuda da IA",
    subtitle: "Diga-nos qual e-mail você precisa — a IA vai redigir uma versão pronta para enviar. Copie e cole no seu aplicativo de e-mail.",
    promptLabel: "Qual e-mail você precisa? (prompt)",
    promptPlaceholder: "Ex: Um e-mail de pedido de folga para meu gerente, dizendo que estou doente amanhã",
    uiLanguageLabel: "Idioma da Interface",
    emailLanguageLabel: "Idioma do E-mail",
    toneLabel: "Tom",
    tones: { professional: "Profissional", friendly: "Amigável", formal: "Formal", apologetic: "Pedido de desculpas" },
    generateBtn: "✨ Gerar E-mail",
    generating: "Gerando...",
    subjectLabel: "Assunto",
    bodyLabel: "Corpo",
    copyBtn: "📋 Copiar E-mail",
    resultBadge: "E-mail Gerado",
    emptyPrompt: "Por favor, digite qual e-mail você precisa.",
    copiedMsg: "✅ Copiado! Cole no seu Gmail/Outlook.",
    serverError: "Erro do servidor - tente novamente.",
    genError: "Não foi possível gerar o e-mail.",
  },
};

const getUiText = (langCode) => UI_TEXT[langCode] || UI_TEXT.en;

export default function EmailWriter() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [uiLanguage, setUiLanguage] = useState("en");
  const [emailLanguage, setEmailLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const t = getUiText(uiLanguage);
  const isRtl = uiLanguage === "ar";

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setStatusMsg(t.emptyPrompt);
      return;
    }
    setLoading(true);
    setStatusMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/email/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tone, language: emailLanguage }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(data.error || t.genError);
        return;
      }
      setSubject(data.subject);
      setBody(data.body);
    } catch (err) {
      console.error("generate error:", err);
      setStatusMsg(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const fullText = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText);
    setStatusMsg(t.copiedMsg);
  };

  return (
    <div className="email-page" dir={isRtl ? "rtl" : "ltr"}>
      <div className="email-hero">
        <span className="hero-badge">{t.badge}</span>
        <h1>
          {t.title1} <span className="highlight">{t.title2}</span>
        </h1>
        <p className="email-subtitle">{t.subtitle}</p>
      </div>

      <div className="email-body">
        <div className="email-panel">
          <label>{t.promptLabel}</label>
          <textarea
            rows={4}
            placeholder={t.promptPlaceholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="field-row">
            <div className="field-col">
              <label>{t.uiLanguageLabel}</label>
              <select value={uiLanguage} onChange={(e) => setUiLanguage(e.target.value)}>
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-col">
              <label>{t.emailLanguageLabel}</label>
              <select value={emailLanguage} onChange={(e) => setEmailLanguage(e.target.value)}>
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field-col">
              <label>{t.toneLabel}</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="professional">{t.tones.professional}</option>
                <option value="friendly">{t.tones.friendly}</option>
                <option value="formal">{t.tones.formal}</option>
                <option value="apologetic">{t.tones.apologetic}</option>
              </select>
            </div>
          </div>

          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" /> {t.generating}
              </span>
            ) : (
              t.generateBtn
            )}
          </button>
        </div>

        {(subject || body) && (
          <div className="email-panel result-panel">
            <div className="result-header">
              <span className="result-badge">{t.resultBadge}</span>
            </div>

            <label>{t.subjectLabel}</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} />

            <label>{t.bodyLabel}</label>
            <textarea
              className="body-textarea"
              rows={12}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <div className="email-btn-row">
              <button className="send-btn" onClick={handleCopy}>
                {t.copyBtn}
              </button>
            </div>
          </div>
        )}

        {statusMsg && <p className="muted">{statusMsg}</p>}
      </div>
    </div>
  );
}