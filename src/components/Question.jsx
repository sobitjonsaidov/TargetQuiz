export default function Question({ question, selected, choose }) {
    return (
        <div className="text-inherit w-full">
            <h2 className="text-lg font-semibold mb-4">{question.q}</h2>

            {/* Mobile: 1 ustun, Desktop: 2 ustun */}
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 w-full">
                {question.options.map((op, i) => (
                    <button
                        key={i}
                        onClick={() => choose(i)}
                        className={`w-full p-4 text-left rounded-xl border transition 
              ${selected === i ? "bg-slate-600 text-white" : "hover:bg-slate-500 text-gray-900 hover:text-white"}`}
                    >
                        {op}
                    </button>
                ))}
            </div>
        </div>
    );
}
