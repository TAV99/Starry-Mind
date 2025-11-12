"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StarryNightQuiz() {
  const router = useRouter();

  const questions = [
    {
      id: 1,
      question: "Nếu một vì sao có thể nói với bạn mỗi đêm, nó sẽ nói gì đầu tiên?",
      options: [
        "“Bạn đã làm tốt rồi, đừng lo nữa.”",
        "“Sao bạn cứ thức khuya thế?”",
        "“Tôi ở đây, bạn không một mình đâu.”",
      ],
    },
    {
      id: 2,
      question:
        "Giữa bầu trời đầy sao, bạn thấy mình là ngôi sao sáng rực, mờ dần, hay đang rơi?",
      options: [
        "Sáng rực rỡ giữa bầu trời.",
        "Mờ dần giữa những ngôi sao khác.",
        "Đang rơi xuống.",
      ],
    },
    {
      id: 3,
      question:
        "Khi đêm xuống, bạn thường muốn tắt hết đèn để yên tĩnh, hay bật sáng để quên đi bóng tối?",
      options: [
        "Tắt hết đèn, để yên lặng bao trùm.",
        "Bật sáng tất cả, để không thấy bóng tối.",
        "Giữ lại một ánh đèn nhỏ.",
      ],
    },
    {
      id: 4,
      question:
        "Nếu có thể gửi một bức thư cho “chính bạn của 5 năm trước”, bạn sẽ nói gì?",
      options: [
        "“Cảm ơn vì đã cố gắng đến tận bây giờ.”",
        "“Ước gì hồi đó mình dũng cảm hơn.”",
        "“Xin lỗi vì đã để cậu phải chịu đựng quá nhiều.”",
      ],
    },
    {
      id: 5,
      question:
        "Có điều gì bạn muốn ai đó hiểu về bạn mà họ chưa từng nhận ra không?",
      options: [
        "Rằng tôi không mạnh mẽ như họ nghĩ.",
        "Rằng tôi thực sự đang cố gắng từng ngày.",
        "Rằng tôi chỉ muốn được ở bên ai đó mà không cần phải giả vờ.",
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (qId: number, ans: string) => {
    setAnswers({ ...answers, [qId]: ans });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };
  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <main className="min-h-screen bg-[#081c48] text-white flex flex-col items-center justify-center p-8">
      {current === 0 && (
        <div className="max-w-4xl flex flex-col md:flex-row items-center justify-center bg-[#0c2760] p-10 rounded-2xl shadow-xl gap-8">
          <Image
            src="/starry-night.jpg"
            alt="The Starry Night"
            width={380}
            height={300}
            className="rounded-xl shadow-lg object-cover"
          />
          <div className="max-w-md text-left space-y-3">
            <h2 className="text-2xl font-bold text-yellow-300">
              The Starry Night — <br /> Bức đêm đầy sao
            </h2>
            <p className="text-sm leading-relaxed text-gray-200">
              Bức tranh thể hiện trạng thái nội tâm đầy cô đơn và khắc khoải của
              Van Gogh trong đêm. Những vòng xoáy của bầu trời tượng trưng cho
              sự hỗn loạn trong tâm trí, xen lẫn ánh sáng le lói của hy vọng và
              niềm tin.
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              Đây là hành trình tự đối thoại – giữa bóng tối và ánh sáng, giữa
              nỗi cô lập và khát vọng được thấu hiểu.
            </p>
            <button
              onClick={() => setCurrent(1)}
              className="bg-yellow-400 text-black font-semibold mt-6 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
            >
              Bắt đầu
            </button>
          </div>
        </div>
      )}

      {current > 0 && current <= questions.length && (
        <div className="max-w-3xl w-full text-center bg-[#0c2760] p-10 rounded-2xl shadow-xl relative">
          <p className="text-sm mb-3 text-gray-300">Câu {current} / 5</p>
          <h2 className="text-xl md:text-2xl font-bold text-yellow-300 mb-6">
            {questions[current - 1].question}
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {questions[current - 1].options.map((opt, i) => (
              <label
                key={i}
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  answers[questions[current - 1].id] === opt
                    ? "border-yellow-400 bg-yellow-300/10"
                    : "border-gray-500 hover:border-yellow-300"
                }`}
                onClick={() =>
                  handleSelect(questions[current - 1].id, opt)
                }
              >
                <input
                  type="radio"
                  name={`q${questions[current - 1].id}`}
                  checked={answers[questions[current - 1].id] === opt}
                  readOnly
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            {current > 1 ? (
              <button
                onClick={prevQuestion}
                className="px-4 py-2 bg-transparent border border-gray-400 rounded-full hover:border-yellow-300 transition"
              >
                ← Quay lại
              </button>
            ) : (
              <div />
            )}

            {current < questions.length ? (
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:scale-105 transition"
              >
                Tiếp theo →
              </button>
            ) : (
              <button
                onClick={() => router.push("/")}
                className="px-8 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:scale-105 transition"
              >
                Đã xong!
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
