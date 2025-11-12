import { Router, Request, Response } from "express";

const router = Router();

/**
 * POST /api/quiz/bedroom
 * Nhận câu trả lời quiz "Bedroom in Arles"
 * Body: { answers: Record<number,string> }
 */
router.post("/bedroom", (req: Request, res: Response) => {
  const { answers } = req.body ?? {};
  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ error: "Thiếu hoặc sai định dạng 'answers'." });
  }

  // Log phục vụ debug
  console.log("📥 Bedroom quiz answers:", answers);

  // Ví dụ: tạo tóm tắt rất nhẹ ở backend (tùy bạn xử lý sâu hơn)
  const picked = Object.values(answers);
  const summary = {
    total: picked.length,
    first: picked[0] ?? null,
    last: picked[picked.length - 1] ?? null,
  };

  return res.json({
    message: "✅ Quiz received",
    quizId: "bedroom-in-arles",
    answers,
    summary,
  });
});

/**
 * (Tuỳ chọn) endpoint chung cho các quiz khác:
 * POST /api/quiz
 * Body: { quizId: string, answers: string[] | Record<number,string> }
 */
router.post("/", (req: Request, res: Response) => {
  const { quizId, answers } = req.body ?? {};
  if (!quizId) return res.status(400).json({ error: "Thiếu 'quizId'." });
  if (!answers) return res.status(400).json({ error: "Thiếu 'answers'." });

  console.log(`📥 Quiz ${quizId} answers:`, answers);
  return res.json({ message: "✅ Quiz received", quizId, answers });
});

export default router;
