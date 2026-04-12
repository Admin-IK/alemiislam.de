export type WisdomType = "ayah" | "hadith";

export type WisdomEntry = {
  type: WisdomType;
  arabic: string;
  tr: string;
  de: string;
  sourceTr: string;
  sourceDe: string;
};

export const ayahs: WisdomEntry[] = [
  {
    type: "ayah",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    tr: "Şüphesiz güçlükle beraber bir kolaylık vardır. Gerçekten, güçlükle beraber bir kolaylık vardır.",
    de: "Wahrlich, mit der Drangsal kommt Erleichterung. Wahrlich, mit der Drangsal kommt Erleichterung.",
    sourceTr: "Kur’ân-ı Kerîm, İnşirâh Sûresi 94/5-6 (Diyanet Meali)",
    sourceDe: "Qur’an, Sure asch-Scharh 94:5–6 (sinngemäße Übersetzung nach M. A. Rassoul)",
  },
  {
    type: "ayah",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    tr: "Bilesiniz ki, kalpler ancak Allah’ı anmakla huzur bulur.",
    de: "Wahrlich, im Gedenken Allahs finden die Herzen Ruhe.",
    sourceTr: "Kur’ân-ı Kerîm, Ra‘d Sûresi 13/28 (Diyanet Meali)",
    sourceDe: "Qur’an, Sure ar-Ra‘d 13:28 (sinngemäße Übersetzung nach M. A. Rassoul)",
  },
  {
    type: "ayah",
    arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ",
    tr: "Şüphesiz Allah; adaleti, iyiliği ve akrabaya yardım etmeyi emreder.",
    de: "Wahrlich, Allah gebietet Gerechtigkeit, Güte und Freigebigkeit gegenüber den Verwandten.",
    sourceTr: "Kur’ân-ı Kerîm, Nahl Sûresi 16/90 (Diyanet Meali)",
    sourceDe: "Qur’an, Sure an-Nahl 16:90 (sinngemäße Übersetzung nach M. A. Rassoul)",
  },
  {
    type: "ayah",
    arabic:
      "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ",
    tr: "Ey insanlar! Şüphesiz sizi bir erkek ile bir dişiden yarattık; birbirinizi tanımanız için sizi kavim ve kabilelere ayırdık. Allah katında en değerli olanınız, O’na karşı gelmekten en çok sakınanınızdır.",
    de: "O ihr Menschen! Wir haben euch aus einem Mann und einer Frau erschaffen und euch zu Völkern und Stämmen gemacht, damit ihr einander kennenlernt. Der vor Allah Angesehenste von euch ist der Gottesfürchtigste unter euch.",
    sourceTr: "Kur’ân-ı Kerîm, Hucurât Sûresi 49/13 (Diyanet Meali)",
    sourceDe: "Qur’an, Sure al-Hudschurat 49:13 (sinngemäße Übersetzung nach M. A. Rassoul)",
  },
  {
    type: "ayah",
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    tr: "Allah, hiç kimseye gücünün üstünde bir şey yüklemez.",
    de: "Allah erlegt keiner Seele mehr auf, als sie zu leisten vermag.",
    sourceTr: "Kur’ân-ı Kerîm, Bakara Sûresi 2/286 (Diyanet Meali)",
    sourceDe: "Qur’an, Sure al-Baqara 2:286 (sinngemäße Übersetzung nach M. A. Rassoul)",
  },
  {
    type: "ayah",
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    tr: "Kim Allah’a tevekkül ederse, O kendisine yeter.",
    de: "Und wer auf Allah vertraut – Er genügt ihm.",
    sourceTr: "Kur’ân-ı Kerîm, Talâk Sûresi 65/3 (Diyanet Meali)",
    sourceDe: "Qur’an, Sure at-Talaq 65:3 (sinngemäße Übersetzung nach M. A. Rassoul)",
  },
];

export const hadiths: WisdomEntry[] = [
  {
    type: "hadith",
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    tr: "Ameller ancak niyetlere göredir.",
    de: "Die Taten werden nur nach den Absichten bewertet.",
    sourceTr: "Buhârî, Bed’ü’l-vahy 1; Müslim, İmâre 155 (Kütüb-i Sitte)",
    sourceDe: "Ṣaḥīḥ al-Buḫārī, Badʾ al-waḥy 1; Ṣaḥīḥ Muslim, al-Imāra 155",
  },
  {
    type: "hadith",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    tr: "Sizin en hayırlınız, Kur’an’ı öğrenen ve onu öğretendir.",
    de: "Der Beste unter euch ist derjenige, der den Qur’an lernt und ihn lehrt.",
    sourceTr: "Buhârî, Fezâilü’l-Kur’ân 21",
    sourceDe: "Ṣaḥīḥ al-Buḫārī, Faḍāʾil al-Qurʾān 21",
  },
  {
    type: "hadith",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّىٰ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    tr: "Sizden biriniz, kendisi için istediğini kardeşi için de istemedikçe (gerçek anlamda) iman etmiş olmaz.",
    de: "Keiner von euch glaubt wahrhaftig, bis er seinem Bruder das wünscht, was er sich selbst wünscht.",
    sourceTr: "Buhârî, Îmân 7; Müslim, Îmân 71 (Kütüb-i Sitte)",
    sourceDe: "Ṣaḥīḥ al-Buḫārī, al-Īmān 7; Ṣaḥīḥ Muslim, al-Īmān 71",
  },
  {
    type: "hadith",
    arabic:
      "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    tr: "Nerede olursan ol Allah’a karşı takvâlı ol. Kötülüğün ardından hemen bir iyilik yap ki onu silsin. İnsanlarla güzel ahlâkla geçin.",
    de: "Fürchte Allah, wo immer du bist; lasse auf eine schlechte Tat eine gute folgen, sie wird sie tilgen; und begegne den Menschen mit gutem Charakter.",
    sourceTr: "Tirmizî, Birr 55 (Kütüb-i Sitte)",
    sourceDe: "Sunan at-Tirmiḏī, al-Birr 55",
  },
  {
    type: "hadith",
    arabic: "مَنْ دَلَّ عَلَىٰ خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ",
    tr: "Kim bir hayra öncülük ederse, ona o hayrı yapanın ecri kadar sevap vardır.",
    de: "Wer zu einem Guten anleitet, dem gebührt der gleiche Lohn wie dem, der es vollbringt.",
    sourceTr: "Müslim, İmâre 133 (Kütüb-i Sitte)",
    sourceDe: "Ṣaḥīḥ Muslim, al-Imāra 133",
  },
  {
    type: "hadith",
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    tr: "Müslüman, diğer Müslümanların dilinden ve elinden emin olduğu kimsedir.",
    de: "Der Muslim ist derjenige, vor dessen Zunge und Hand die (anderen) Muslime sicher sind.",
    sourceTr: "Buhârî, Îmân 4-5; Müslim, Îmân 64 (Kütüb-i Sitte)",
    sourceDe: "Ṣaḥīḥ al-Buḫārī, al-Īmān 4–5; Ṣaḥīḥ Muslim, al-Īmān 64",
  },
];
