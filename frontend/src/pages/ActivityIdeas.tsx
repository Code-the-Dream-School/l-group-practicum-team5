
type Activity = {
  title: string;
  description: string;
  likes: number;
  comments: number;
};

const activities: Activity[] = [
  {
    title: "Escape Room",
    description:
      "Let’s try the new Lord of the Rings themed escape room downtown",
    likes: 6,
    comments: 3,
  },
  {
    title: "Brewery Tour",
    description:
      "Lots of beer all over town. Designated driver gets AYCE food all day.",
    likes: 7,
    comments: 3,
  },
  {
    title: "Beach Bonfire",
    description: "S’mores and singalongs.",
    likes: 3,
    comments: 0,
  },
  {
    title: "Camping in Joshua Tree",
    description: "Just us and the stars.",
    likes: 7,
    comments: 2,
  },
  {
    title: "Paint and sip",
    description: "Wine and painting each other.",
    likes: 2,
    comments: 5,
  },
  {
    title: "Zoo trip",
    description: "Sounds fun.",
    likes: 5,
    comments: 7,
  },
];

export default function ActivityIdeas(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[#d7c1f7]">

      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-400 px-6 py-4">
        <button className="flex items-center gap-3 text-2xl font-medium">
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        <h1 className="text-5xl font-extrabold mb-8">
          Activity Ideas
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white border border-black rounded-3xl p-8 flex flex-col justify-between min-h-[220px]"
            >
              {/* Top */}
              <div>
                <h2 className="text-4xl font-extrabold mb-4">
                  {activity.title}
                </h2>

                <p className="text-2xl text-gray-800">
                  {activity.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex justify-end gap-10 text-2xl mt-6">
                <div className="flex items-center gap-2">
                  <span>👍</span>
                  <span>{activity.likes}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>💬</span>
                  <span>{activity.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}