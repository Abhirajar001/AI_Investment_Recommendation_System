import { ArrowRight, Brain, CheckCircle2, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function RiskProfile() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const questions = [
    {
      question: 'What are you investing for right now?',
      options: [
        'Protect my money while I learn',
        'Build a side-income habit',
        'Grow steadily over time',
        'Aim for higher returns and accept more ups and downs',
      ],
    },
    {
      question: 'How long can you keep your money invested?',
      options: [
        'Less than 3 years',
        '3-7 years',
        '7-15 years',
        '15+ years',
      ],
    },
    {
      question: 'If your portfolio dropped 20%, what would you do?',
      options: [
        'Exit immediately',
        'Reduce exposure a little',
        'Wait calmly for recovery',
        'See it as a chance to buy more',
      ],
    },
    {
      question: 'How much of your savings are you ready to invest?',
      options: [
        'Less than 10%',
        '10% - 30%',
        '30% - 50%',
        'More than 50%',
      ],
    },
    {
      question: 'How new are you to investing?',
      options: [
        'I am just getting started',
        'I know the basics',
        'I have invested before',
        'I actively manage investments',
      ],
    },
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isAnswered = answers[currentQuestion] !== undefined;

  const handleAnswer = (optionIndex: string) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#eff6ff_100%)] text-slate-900">
      <div className="border-b border-amber-200/60 bg-white/85 px-5 py-6 backdrop-blur md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">
              <Sparkles size={14} />
              Learning your comfort zone
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Find your investing style</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Answer a few quick questions so the app can suggest starter investments that feel realistic, not scary.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Progress</p>
            <p className="mt-1 text-lg font-black text-slate-900">{Math.round(progress)}%</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 p-5 md:p-8">
        <section className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-3xl bg-slate-900 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Brain size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">AI guided</p>
                  <p className="text-lg font-black">3 minute assessment</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                We use your answers to tune your starter plan. The goal is not perfection. The goal is to help you begin safely.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-200">
                {['Simple language', 'No finance jargon', 'Built for first-time investors'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <CheckCircle2 className="text-emerald-300" size={18} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <h3 className="text-2xl font-black tracking-tight text-slate-900">{questions[currentQuestion].question}</h3>
          <div className="mt-6 space-y-3">
            {questions[currentQuestion].options.map((option, index) => {
              const selected = answers[currentQuestion] === String(index);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(String(index))}
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                    selected
                      ? 'border-orange-400 bg-orange-50 shadow-md'
                      : 'border-slate-200 hover:border-orange-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${selected ? 'border-orange-500 bg-orange-500' : 'border-slate-300'}`}>
                      {selected && <CheckCircle2 className="text-white" size={16} />}
                    </div>
                    <span className={`font-medium ${selected ? 'text-orange-700' : 'text-slate-700'}`}>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`rounded-2xl px-6 py-3 font-bold transition-all ${
              currentQuestion === 0
                ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white text-slate-700 shadow-md hover:-translate-y-0.5 hover:text-orange-700'
            }`}
          >
            Previous
          </button>

          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-extrabold transition-all ${
                isAnswered
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:-translate-y-0.5'
                  : 'cursor-not-allowed bg-slate-100 text-slate-400'
              }`}
            >
              Next question <ArrowRight size={18} />
            </button>
          ) : (
            <button
              disabled={!isAnswered}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-extrabold transition-all ${
                isAnswered
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:-translate-y-0.5'
                  : 'cursor-not-allowed bg-slate-100 text-slate-400'
              }`}
            >
              <Brain size={18} />
              Submit for AI analysis
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
