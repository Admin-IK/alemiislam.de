export type Locale = "de" | "tr";

export const locales: Locale[] = ["de", "tr"];

export const defaultLocale: Locale = "de";

const messages = {
  de: {
    lang: {
      group: "Sprache wählen",
      de: "Deutsch",
      tr: "Türkçe",
    },
    nav: {
      aria: "Hauptnavigation",
      about: "Über uns",
      offer: "Angebot",
      news: "Aktuelles",
      contact: "Kontakt",
      home: "Start",
      imprint: "Impressum",
      privacy: "Datenschutz",
      orgMenu: "Organisation",
    },
    org: {
      bildung: "Bildung",
      jugend: "Jugendorganisation",
      frauen: "Frauenorganisation",
      frauenJugend: "Frauen-Jugendorganisation",
    },
    orgPages: {
      bildung: {
        title: "Bildung",
        intro:
          "In unserer Gemeinde finden Bildungsangebote für Kinder, Jugendliche und Erwachsene statt – von Qur’an-Lesen und Grundlagen des Glaubens bis zu Kursen und Seminaren im Rahmen des Vereinslebens. Termine und Anmeldung erfahren Sie in der Moschee oder über unsere Kanäle.",
      },
      jugend: {
        title: "Jugendorganisation",
        intro:
          "Die Jugendorganisation begleitet junge Menschen bei Freizeit, Bildung und Gemeinschaft. Aktivitäten richten sich an Interessen vor Ort und werden mit den Elternhaus- und Vereinsstrukturen abgestimmt. Bei Fragen wenden Sie sich an die Gemeinde.",
      },
      frauen: {
        title: "Frauenorganisation",
        intro:
          "Die Frauenorganisation bündelt Angebote für Frauen in unserer Gemeinde – etwa Treffen, Bildung und soziales Engagement. Einzelheiten zu Programmen und Zeiten erhalten Sie direkt in der Moschee.",
      },
      frauenJugend: {
        title: "Frauen-Jugendorganisation",
        intro:
          "Die Frauen-Jugendorganisation richtet sich an junge Frauen und Mädchen und verbindet Bildung, Freizeit und Gemeinschaft im Rahmen der Gemeinde. Kontakt und aktuelle Termine über die Moschee.",
      },
    },
    header: {
      brandSr: "Alemi Islam Moschee – Startseite",
    },
    hero: {
      eyebrow: "Ludwigshafen am Rhein",
      title: "Gemeinsam Glauben leben",
      lead:
        "Die Alemi Islam Moschee ist die Gebetsstätte des IGMG Ortsvereins Ludwigshafen West e.V. Wir sind offen für Nachbarinnen und Nachbarn und laden zu Gebet, Bildung und Begegnung ein.",
      visit: "Besuch planen",
      facebook: "Facebook",
    },
    prayer: {
      title: "Gebetszeiten heute",
      subtitle: "Ludwigshafen (IGMG) · Europe/Berlin",
      imsak: "Imsak",
      gunes: "Sonnenaufgang",
      ogle: "Mittagsgebet",
      ikindi: "Nachmittagsgebet",
      aksam: "Abendgebet",
      yatsi: "Nachtgebet",
      loading: "Gebetszeiten werden geladen …",
      error: "Gebetszeiten konnten nicht geladen werden. Bitte später erneut versuchen.",
      sourceNote: "",
      ticker: {
        imsak: "Imsak",
        gunes: "Sonne",
        ogle: "Mittag",
        ikindi: "Nachmitt.",
        aksam: "Abend",
        yatsi: "Nacht",
      },
    },
    about: {
      title: "Über unsere Gemeinde",
      introBefore: "Als Teil der ",
      igmgLink: "Islamischen Gemeinschaft Millî Görüş (IGMG)",
      introAfter:
        " engagieren wir uns für den Glauben, Bildung und eine solidarische Gesellschaft in Deutschland.",
      historyTitle: "Geschichte",
      historyP1:
        "Unsere Gemeinschaft wurde 1980 im Ludwigshafener Stadtteil Hemshof gegründet und begann in einer bescheidenen Hinterhaus-Moschee. 2003 bezogen wir das heutige Gebäude in der Krummlachstraße – ein ehemaliges Leder- und Pelzbearbeitungsgebäude, das wir zu einem offenen Gemeindefreiraum weiterentwickelt haben.",
      historyP2:
        "Heute ist die Alemi Islam Moschee ein Ort des täglichen Gebets, der Kinder- und Jugendarbeit sowie der Nachbarschaftsbegegnung.",
      networkTitle: "Verbund",
      networkP1:
        "Der Ortsverein ist in den Strukturen der IGMG eingebunden und arbeitet mit anderen Moscheegemeinden, Trägern und Stadtinstitutionen zusammen – etwa beim",
      openMosqueDay: "Tag der offenen Moschee",
      networkP1b:
        "und bei Informationsangeboten für Schulklassen und interessierte Bürgerinnen und Bürger.",
      networkP2:
        "Weitere Veröffentlichungen und Stellungnahmen finden Sie auf der Bundesseite der IGMG.",
    },
    offer: {
      title: "Angebot & Gemeindeleben",
      intro:
        "Neben den fünf täglichen Gebeten bieten wir Programme für Familien und eine Mitgliedschaft im eingetragenen Verein an.",
      prayerTitle: "Gebet & Freitagspredigt",
      prayerText:
        "Aktuelle Gebetszeiten werden in der Moschee ausgehängt und – wo vorhanden – in den Kanälen der Gemeinde geteilt. Bei Fragen hilft Ihnen unser Team am Empfang weiter.",
      eduTitle: "Bildung & Wochenendkurse",
      eduText:
        "Religiöse Grundbildung für Kinder und Jugendliche sowie Weiterbildung für Erwachsene ergänzen das Gemeindeleben – in Koordination mit den Schulferien und Vereinskalender.",
      cityTitle: "Offen für die Stadt",
      cityText:
        "Führungen, der Tag der offenen Moschee und Austausch mit Nachbarschaftsinitiativen sind feste Bausteine unserer Arbeit in Ludwigshafen.",
      memberStrong: "Mitglied werden:",
      memberLink: "Mitgliedsantrag über EasyVerein",
    },
    news: {
      title: "Aktuelles & Nachrichten",
      introBefore:
        "Verbandspolitische Meldungen und Freitagspredigten erscheinen zentral auf der Website der IGMG. Hier verweisen wir auf ausgewählte Themen – ergänzend zu unserem",
      facebookPage: "Facebook-Auftritt",
      introAfter: ".",
      metaFed: "IGMG · Verband",
      linkFed: "Pressemitteilungen und Freitagspredigten der IGMG",
      metaLocal: "Gemeinde",
      linkLocal:
        "Veranstaltungshinweise vor Ort: Bitte Kontakt aufnehmen oder Facebook besuchen",
      metaSolidarity: "Solidarität",
      textSolidarity:
        "Aktionen wie „Bayram unter Nachbarn“ und die Internationale Woche gegen Rassismus werden regelmäßig in Kooperation mit der IGMG unterstützt.",
      shortTitle: "Kurzinfo",
      dtClub: "Verein",
      dtAddress: "Adresse",
    },
    contact: {
      title: "Kontakt & Anfahrt",
      intro:
        "Sie erreichen uns telefonisch und per E-Mail. Für Besuche außerhalb der Gebetszeiten bitten wir um vorherige Absprache.",
      directTitle: "Direktkontakt",
      phone: "Telefon",
      email: "E-Mail",
      address: "Adresse",
      followFb: "Facebook folgen",
      igmgSite: "IGMG.org",
      mapTitle:
        "Karte: Alemi Islam Moschee, Krummlachstraße 6, Ludwigshafen",
      mapLink: "Größere Karte auf OpenStreetMap",
    },
    footer: {
      title: "Alemi Islam Moschee",
      line:
        "IGMG Ortsverein Ludwigshafen West e.V. · Krummlachstraße 6 · 67059 Ludwigshafen",
      imprint: "Impressum",
      privacy: "Datenschutz",
      igmgFederal: "IGMG Bundesseite",
      facebook: "Facebook",
    },
    subpage: {
      footerCopyright: "© {year} IGMG Ortsverein Ludwigshafen West e.V.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      lead:
        "Nachfolgend informieren wir Sie über die Verarbeitung personenbezogener Daten bei Nutzung dieser Website. Maßgeblich sind die gesetzlichen Vorgaben (insbesondere DSGVO und BDSG).",
      s1Title: "1. Verantwortliche Stelle",
      s1Body:
        "Verantwortlich im Sinne der Datenschutzgesetze ist der IGMG Ortsverein Ludwigshafen West e.V., vertreten durch die Alemi Islam Moschee, Krummlachstraße 6, 67059 Ludwigshafen am Rhein, Telefon 0621 52 47 05, E-Mail info@alemiislam.de.",
      s2Title: "2. Hosting und Server-Logfiles",
      s2Body:
        "Diese Website wird bei einem Hosting-Anbieter betrieben. Beim Aufruf der Seiten erhebt der Provider technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit der Anfrage, übertragene Datenmenge). Die Verarbeitung dient der Bereitstellung und Sicherheit der Website; Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Bitte ergänzen Sie den Namen und die Kontaktdaten Ihres Hosters sowie ggf. einen Auftragsverarbeitungsvertrag.",
      s3Title: "3. Kontakt per E-Mail oder Telefon",
      s3Body:
        "Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten zur Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen bzw. Vertrag) bzw. Art. 6 Abs. 1 lit. f DSGVO (allgemeine Anfragen).",
      s4Title: "4. Verlinkungen (Facebook, IGMG, EasyVerein, Karten)",
      s4Body:
        "Unsere Website enthält Links zu externen Angeboten (z. B. Facebook, IGMG-Bundesseite, EasyVerein, OpenStreetMap). Für deren Inhalte und Datenschutz sind ausschließlich die jeweiligen Betreiber verantwortlich. Bitte beachten Sie deren Datenschutzhinweise.",
      s5Title: "5. Ihre Rechte",
      s5Body:
        "Sie haben nach Maßgabe der gesetzlichen Vorgaben Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung. Außerdem steht Ihnen ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.",
      s6Title: "6. Aktualität",
      s6Body:
        "Wir passen diese Hinweise an, wenn sich unsere Website oder die Rechtslage ändert. Bitte prüfen Sie den Stand regelmäßig.",
      note:
        "Hinweis: Diese Texte sind eine sachliche Grundlage und ersetzen keine individuelle Rechtsberatung. Lassen Sie Angaben zu Hosting, Auftragsverarbeitung, Mitgliederverwaltung und ggf. Messdiensten vom Verein prüfen und ergänzen.",
      back: "← Zur Startseite",
    },
    impressum: {
      title: "Impressum",
      orgBlock:
        "IGMG Ortsverein Ludwigshafen West e.V.\nAlemi Islam Moschee",
      note:
        "Vertretungsberechtigte Personen, Registergericht, Vereinsregister-Nummer und Umsatzsteuer-Identifikationsnummer bitte vom Verein bestätigen lassen und hier ergänzen, sobald die Daten für die Veröffentlichung vorliegen.",
      back: "← Zur Startseite",
    },
  },
  tr: {
    lang: {
      group: "Dil seçin",
      de: "Almanca",
      tr: "Türkçe",
    },
    nav: {
      aria: "Ana menü",
      about: "Hakkımızda",
      offer: "Faaliyetler",
      news: "Güncel",
      contact: "İletişim",
      home: "Ana sayfa",
      imprint: "Künye",
      privacy: "Gizlilik",
      orgMenu: "Teşkilat",
    },
    org: {
      bildung: "Eğitim",
      jugend: "Gençlik Teşkilatı",
      frauen: "Kadınlar Teşkilatı",
      frauenJugend: "Kadınlar Gençlik Teşkilatı",
    },
    orgPages: {
      bildung: {
        title: "Eğitim",
        intro:
          "Cemaatimizde çocuklar, gençler ve yetişkinler için Kur’an, iman esasları ve dernek çerçevesinde kurs ve seminerler düzenlenir. Tarihler ve kayıt için camiye danışın veya duyuru kanallarımızı takip edin.",
      },
      jugend: {
        title: "Gençlik Teşkilatı",
        intro:
          "Gençlik teşkilatı boş zaman, eğitim ve bir araya gelmeyi destekler. Faaliyetler yerel ilgi alanlarına göre planlanır ve aile ile dernek yapılarıyla uyumludur. Sorularınız için cemaatle iletişime geçin.",
      },
      frauen: {
        title: "Kadınlar Teşkilatı",
        intro:
          "Kadınlar teşkilatı buluşmalar, eğitim ve sosyal sorumluluk gibi kadınlara yönelik programları bir araya getirir. Program ve saatler için doğrudan camiden bilgi alabilirsiniz.",
      },
      frauenJugend: {
        title: "Kadınlar Gençlik Teşkilatı",
        intro:
          "Kadınlar gençlik teşkilatı genç kadın ve kızlara yöneliktir; eğitim, boş zaman ve cemaat içi dayanışmayı birleştirir. İletişim ve güncel programlar için camiye başvurun.",
      },
    },
    header: {
      brandSr: "Alemi İslam Camii – Ana sayfa",
    },
    hero: {
      eyebrow: "Ludwigshafen am Rhein",
      title: "İmanı birlikte yaşamak",
      lead:
        "Alemi İslam Camii, IGMG Ludwigshafen Batı Yerel Derneği e.V.’nin ibadethanesidir. Komşularımıza açığız; namaz, eğitim ve karşılaşmaya davet ediyoruz.",
      visit: "Ziyaret planlayın",
      facebook: "Facebook",
    },
    prayer: {
      title: "Bugünkü namaz vakitleri",
      subtitle: "Ludwigshafen (IGMG) · Europe/Berlin",
      imsak: "İmsak",
      gunes: "Güneş",
      ogle: "Öğle",
      ikindi: "İkindi",
      aksam: "Akşam",
      yatsi: "Yatsı",
      loading: "Namaz vakitleri yükleniyor …",
      error: "Namaz vakitleri yüklenemedi. Lütfen daha sonra tekrar deneyin.",
      sourceNote: "",
      ticker: {
        imsak: "İmsak",
        gunes: "Güneş",
        ogle: "Öğle",
        ikindi: "İkindi",
        aksam: "Akşam",
        yatsi: "Yatsı",
      },
    },
    about: {
      title: "Cemaatimiz hakkında",
      introBefore: "",
      igmgLink: "İslam Toplumu Millî Görüş (IGMG)",
      introAfter:
        " çatısı altında inanç, eğitim ve dayanışmacı bir toplum için çalışıyoruz.",
      historyTitle: "Tarihçe",
      historyP1:
        "Cemaatimiz 1980’de Ludwigshafen Hemshof’ta kuruldu ve mütevazı bir arka bahçe mescidinde faaliyete başladı. 2003’te Krummlachstraße’daki bugünkü binaya taşındık – eski bir deri ve kürk işleme binasını açık bir cemaat alanına dönüştürdük.",
      historyP2:
        "Bugün Alemi İslam Camii günlük namazların, çocuk ve gençlik çalışmaları ile komşuluk buluşmalarının yapıldığı bir merkezdir.",
      networkTitle: "Bağlar",
      networkP1:
        "Yerel dernek IGMG yapılanmasına bağlıdır; diğer cami cemaatleri, kurumlar ve belediye ile birlikte çalışır – örneğin",
      openMosqueDay: "Açık Cami Günü",
      networkP1b:
        "nda ve okul sınıfları ile vatandaşlara yönelik bilgilendirme programlarında.",
      networkP2:
        "Ek yayın ve açıklamalar için IGMG federal sitesine bakabilirsiniz.",
    },
    offer: {
      title: "Faaliyetler & cemaat hayatı",
      intro:
        "Beş vakit namazın yanı sıra ailelere yönelik programlar ve tüzel dernek üyeliği sunuyoruz.",
      prayerTitle: "Namaz & Cuma hutbesi",
      prayerText:
        "Güncel namaz vakitleri camide ilan edilir ve varsa cemaat kanallarında paylaşılır. Sorularınız için resepsiyondaki ekibimiz yardımcı olur.",
      eduTitle: "Eğitim & hafta sonu kursları",
      eduText:
        "Çocuk ve gençlere dini temel eğitim ile yetişkinlere ileri düzey programlar, okul tatilleri ve dernek takvimiyle uyumlu şekilde sunulur.",
      cityTitle: "Şehre açık",
      cityText:
        "Geziler, Açık Cami Günü ve komşuluk girişimleriyle iş birliği Ludwigshafen’deki çalışmamızın sabit parçalarıdır.",
      memberStrong: "Üye olun:",
      memberLink: "EasyVerein üzerinden üyelik başvurusu",
    },
    news: {
      title: "Güncel & haberler",
      introBefore:
        "Birlik politikasına ilişkin duyurular ve Cuma hutbeleri IGMG sitesinde yayımlanır. Burada seçili konulara yönlendiriyoruz – ayrıca",
      facebookPage: "Facebook sayfamıza",
      introAfter: " bakabilirsiniz.",
      metaFed: "IGMG · Birlik",
      linkFed: "IGMG basın açıklamaları ve Cuma hutbeleri",
      metaLocal: "Cemaat",
      linkLocal:
        "Yerel etkinlik duyuruları: lütfen iletişime geçin veya Facebook’u ziyaret edin",
      metaSolidarity: "Dayanışma",
      textSolidarity:
        "„Komşularla bayram“ gibi girişimler ve Irkçılığa Karşı Uluslararası Hafta, IGMG ile iş birliği içinde düzenli olarak desteklenir.",
      shortTitle: "Kısa bilgi",
      dtClub: "Dernek",
      dtAddress: "Adres",
    },
    contact: {
      title: "İletişim & ulaşım",
      intro:
        "Bize telefon ve e-posta ile ulaşabilirsiniz. Namaz vakitleri dışındaki ziyaretler için önceden haber vermenizi rica ederiz.",
      directTitle: "Doğrudan iletişim",
      phone: "Telefon",
      email: "E-posta",
      address: "Adres",
      followFb: "Facebook’ta takip edin",
      igmgSite: "IGMG.org",
      mapTitle: "Harita: Alemi İslam Camii, Krummlachstraße 6, Ludwigshafen",
      mapLink: "OpenStreetMap’te daha büyük harita",
    },
    footer: {
      title: "Alemi İslam Camii",
      line:
        "IGMG Ludwigshafen Batı Yerel Derneği e.V. · Krummlachstraße 6 · 67059 Ludwigshafen",
      imprint: "Künye",
      privacy: "Gizlilik",
      igmgFederal: "IGMG federal sitesi",
      facebook: "Facebook",
    },
    subpage: {
      footerCopyright: "© {year} IGMG Ludwigshafen Batı Yerel Derneği e.V.",
    },
    privacy: {
      title: "Gizlilik bildirimi",
      lead:
        "Bu web sitesini kullanımınız sırasında kişisel verilerin işlenmesi hakkında bilgi veriyoruz. Esas olarak yürürlükteki yasal düzenlemeler (özellikle GDPR/DSGVO ve BDSG) geçerlidir.",
      s1Title: "1. Sorumlu birim",
      s1Body:
        "Veri koruma yasalarına göre sorumlu: IGMG Ludwigshafen Batı Yerel Derneği e.V., Alemi İslam Camii aracılığıyla temsil edilir, Krummlachstraße 6, 67059 Ludwigshafen am Rhein, telefon 0621 52 47 05, e-posta info@alemiislam.de.",
      s2Title: "2. Barındırma ve sunucu günlükleri",
      s2Body:
        "Site bir barındırma sağlayıcısında çalışır. Sayfa çağrılarında sağlayıcı teknik olarak gerekli verileri (ör. IP adresi, tarih ve saat, aktarılan veri miktarı) işleyebilir. Amaç sitenin sunumu ve güvenliğidir; hukuki dayanak GDPR md. 6(1)(f). Barındırıcı adı ve iletişim bilgileri ile gerekirse veri işleme sözleşmesi eklenmelidir.",
      s3Title: "3. E-posta veya telefonla iletişim",
      s3Body:
        "Bize ulaştığınızda talebinizi yanıtlamak için ilettiğiniz verileri işleriz. Hukuki dayanak GDPR md. 6(1)(b) (sözleşme öncesi/ sözleşme) veya md. 6(1)(f) (genel sorular).",
      s4Title: "4. Bağlantılar (Facebook, IGMG, EasyVerein, haritalar)",
      s4Body:
        "Sitemiz harici hizmetlere bağlantılar içerir (ör. Facebook, IGMG ana site, EasyVerein, OpenStreetMap). İçerik ve gizlilik için yalnızca ilgili işletmeler sorumludur; lütfen onların gizlilik bildirimlerini okuyun.",
      s5Title: "5. Haklarınız",
      s5Body:
        "Yasal düzenlemelere göre bilgi alma, düzeltme, silme, işlemeyi kısıtlama, veri taşınabilirliği ve işlemeye itiraz haklarına sahipsiniz. Ayrıca bir veri koruma denetim otoritesine şikâyet hakkınız vardır.",
      s6Title: "6. Güncellik",
      s6Body:
        "Web sitemiz veya hukuk değiştiğinde bu metni güncelleriz. Lütfen metni düzenli olarak kontrol edin.",
      note:
        "Not: Bu metinler genel bir temel sağlar, hukuki danışmanlığın yerini tutmaz. Barındırma, alt işlemci, üyelik yönetimi ve ölçüm araçları için dernekten doğrulama ve tamamlama yapılmalıdır.",
      back: "← Ana sayfaya",
    },
    impressum: {
      title: "Künye (Impressum)",
      orgBlock:
        "IGMG Ludwigshafen Batı Yerel Derneği e.V.\nAlemi İslam Camii",
      note:
        "Yetkili temsilciler, sicil mahkemesi, dernek sicil numarası ve KDV kimlik numarası; yayın için veriler dernekten teyit edilip buraya eklenmelidir.",
      back: "← Ana sayfaya",
    },
  },
} as const;

function getLeaf(obj: unknown, parts: string[]): string | undefined {
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || typeof cur !== "object" || !(p in cur)) return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function translate(locale: Locale, path: string, vars?: Record<string, string>): string {
  let text =
    getLeaf(messages[locale], path.split(".")) ??
    getLeaf(messages[defaultLocale], path.split(".")) ??
    path;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, v);
    }
  }
  return text;
}
