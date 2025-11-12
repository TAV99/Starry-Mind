"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EternityGateQuiz() {
  const router = useRouter();

  const questions = [
    {
      id: 1,
      question: "Nếu tâm hồn bạn là một căn phòng, hiện tại nó đang sáng đèn hay chìm trong bóng tối?",
      options: [
        "Ánh đèn vẫn sáng, dù hơi yếu.",
        "Bóng tối bao trùm, tôi không rõ ánh sáng ở đâu.",
        "Tôi chưa bật đèn, chỉ đang ngồi trong yên lặng.",
      ],
      sos: [2], // B là cảnh báo
    },
    {
      id: 2,
      question: "Khi bạn đứng giữa một đám đông, bạn cảm thấy mình đang cùng họ — hay chỉ đang quan sát họ từ xa?",
      options: [
        "Tôi cảm thấy mình hòa cùng họ, dù không thân thiết lắm.",
        "Tôi chỉ đang đứng ngoài, như người quan sát.",
        "Tôi thấy mọi người ở đó, nhưng như một thế giới khác hẳn.",
      ],
      sos: [3],
    },
    {
      id: 3,
      question: "Nếu có một cánh cửa dẫn đến nơi bạn từng cảm thấy thật sự bình yên, bạn có muốn bước vào lại không — hay sợ rằng mọi thứ đã đổi khác?",
      options: [
        "Tôi sẽ bước vào ngay, chỉ để được yên bình lại.",
        "Tôi sợ rằng nơi đó không còn như xưa.",
        "Tôi sẽ gõ cửa, nhưng nếu không ai trả lời, tôi vẫn sẽ đi tiếp.",
      ],
      sos: [2],
    },
    {
      id: 4,
      question: "Giả sử trong lòng bạn là một dòng sông, nước đang chảy êm đềm, dâng tràn, hay đã cạn khô từ lâu?",
      options: [
        "Nước vẫn chảy, dù đôi khi đục ngầu.",
        "Nước đang dâng tràn, sắp vỡ bờ.",
        "Dòng sông đã khô, tôi chẳng còn cảm xúc gì nữa.",
      ],
      sos: [2, 3], // B và C đều là cảnh báo
    },
    {
      id: 5,
      question: "Nếu có thể gửi một lá thư cho “phiên bản cũ của bạn” — người từng vui vẻ, tin tưởng và mơ mộng — bạn sẽ nói gì?",
      options: [
        "“Cảm ơn vì đã từng tin tưởng, tôi sẽ cố gắng sống xứng đáng với niềm tin đó.”",
        "“Xin lỗi vì đã để cậu thất vọng.”",
        "“Tôi không nhớ người đó là ai nữa.”",
      ],
      sos: [3],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSOS, setShowSOS] = useState(false);

  const handleSelect = (qId: number, ans: string, idx: number) => {
    setAnswers({ ...answers, [qId]: ans });
    const q = questions.find((q) => q.id === qId);
    if (q && q.sos.includes(idx + 1)) {
      setShowSOS(true);
    }
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };
  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <main className="min-h-screen bg-[#081c48] text-white flex flex-col items-center justify-center p-8">
      {/* MỞ ĐẦU */}
      {current === 0 && (
        <div className="max-w-4xl flex flex-col md:flex-row items-center justify-center bg-[#0c2760] p-10 rounded-2xl shadow-xl gap-8">
          <Image
            src="/At_Eternity's_Gate.jpg"
            alt="The Sorrowing Old Man (At Eternity’s Gate)"
            width={380}
            height={300}
            className="rounded-xl shadow-lg object-cover"
          />
          <div className="max-w-md text-left space-y-3">
            <h2 className="text-2xl font-bold text-yellow-300">
              The Sorrowing Old Man (At Eternity’s Gate) — <br /> Người đàn ông đau buồn
            </h2>
            <p className="text-sm leading-relaxed text-gray-200">
              Tác phẩm được vẽ khi Van Gogh đang ở giai đoạn khủng hoảng sâu sắc nhất.
              Ông ngồi trong tuyệt vọng, giữa ranh giới của niềm tin và sự mất mát —
              như lời cầu nguyện cuối cùng dành cho chính mình.
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              Bài quiz này giúp bạn nhận diện cảm giác vô định, mất ý nghĩa sống và hành trình tìm lại ánh sáng nội tâm.
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

      {/* CÂU HỎI */}
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
                onClick={() => handleSelect(questions[current - 1].id, opt, i)}
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

      {/* ⚠️ SOS Popup */}
      {showSOS && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#102b66] max-w-lg p-8 rounded-2xl text-center shadow-2xl border border-red-400">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              ⚠️ Có vẻ bạn đang cảm thấy rất mệt mỏi
            </h3>
            <p className="text-gray-200 mb-2">
              Nếu trong khi trả lời, bạn cảm thấy buồn, trống rỗng hoặc mất năng lượng — hãy dừng lại, hít sâu, uống nước, và nói chuyện với người bạn tin tưởng.
            </p>
            <p className="text-yellow-300 mb-4">Bạn không đơn độc.</p>
            <div className="text-left text-sm space-y-2 bg-[#0a1b42] p-4 rounded-xl">
              <p>📞 Tổng đài 111: Tư vấn trẻ em (24/7, miễn phí)</p>
              <p>☎️ Hotline 1900 6233: Hỗ trợ tâm lý (Bộ Y tế)</p>
              <p>🌐 Mindcare.vn / Bluebell Hotline: Tư vấn tâm lý cá nhân</p>
            </div>
            <button
              onClick={() => setShowSOS(false)}
              className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:scale-105 transition"
            >2
              Tôi hiểu rồi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
