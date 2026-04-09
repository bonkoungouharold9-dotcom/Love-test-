export default function handler(req, res) {
  const { girl, boy, ageGirl, ageBoy } = req.query;

  if (!girl || !boy || !ageGirl || !ageBoy) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  // Calcul d’un score basé sur les noms et âges
  let text = girl + boy + ageGirl + ageBoy;
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = Math.abs(hash % 101);

  let message = "";
  if (score > 80) message = "🔥 Âmes sœurs détectées";
  else if (score > 50) message = "💘 Bonne connexion";
  else message = "😅 Compatibilité faible";

  res.status(200).json({ score, message });
}
