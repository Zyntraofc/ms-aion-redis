import express from "express";
import cors from "cors";
import { recordUserAction, getUserRecentActions } from "./userActionsService.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/record", async (req, res) => {
  try {
    const { userId, action } = req.body;
    if (!userId || !action)
      return res.status(400).json({ error: "userId e action são obrigatórios" });

    await recordUserAction(userId, action);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar ação" });
  }
});

app.get("/recent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const actions = await getUserRecentActions(userId);
    res.json(actions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar ações" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));
