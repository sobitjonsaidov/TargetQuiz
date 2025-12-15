export default function Question({ question, selected, choose }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">{question.q}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((op, i) => (
                    <button
                        key={i}
                        onClick={() => choose(i)}
                        className={`border rounded-xl p-3 text-left transition ${selected === i ? "bg-blue-600 text-white" : "hover:bg-blue-50"
                            }`}
                    >
                        {op}
                    </button>
                ))}
            </div>
        </div>
    );
}
