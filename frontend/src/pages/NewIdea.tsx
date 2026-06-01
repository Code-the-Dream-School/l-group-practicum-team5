export default function NewIdea() {
    return (
      <div className="min-h-screen bg-[#c6b3ee]">
        <header className="h-20 bg-white flex items-center px-6">
          <button className="flex items-center gap-2 font-medium">
            ← Back to Dashboard
          </button>
        </header>
  
        <div className="flex justify-center py-16 px-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl p-10">
            <h1 className="text-5xl font-bold mb-2">New idea</h1>
  
            <p className="text-2xl mb-8">
              What do you want to do today?
            </p>
  
            <div className="space-y-8">
              <div>
                <label className="block text-xl mb-3">Title</label>
                <input
                  type="text"
                  className="w-full h-14 bg-gray-100 rounded-xl px-4"
                />
              </div>
  
              <div>
                <label className="block text-xl mb-3">
                  Description *
                </label>
  
                <textarea
                  rows={8}
                  className="w-full bg-gray-100 rounded-xl p-4 resize-none"
                />
              </div>
  
              <div className="flex justify-center gap-8">
                <button className="w-52 h-12 bg-gray-200 rounded-xl font-semibold">
                  Cancel
                </button>
  
                <button className="w-52 h-12 bg-purple-600 text-white rounded-xl font-semibold">
                  Create Idea
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }