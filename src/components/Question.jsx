export default function Question({ question, selected, choose }) {
    return (
        <div className="text-inherit w-full">
            {/* Savol matni */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-4 text-center leading-snug">
                {question.q}
            </h2>

            {/* Javoblar */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3 md:gap-4 w-full">
                {question.options.map((op, i) => (
                    <button
                        key={i}
                        onClick={() => choose(i)}
                        className={`w-full px-4 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-lg sm:rounded-xl border-2 text-left transition-all
              ${selected === i
                                ? "bg-slate-600 text-white border-slate-600 text-base sm:text-lg md:text-xl lg:text-2xl"
                                : "hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl"}`}
                    >
                        {op}
                    </button>
                ))}
            </div>
        </div>
    );
}