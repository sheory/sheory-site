import Image from "next/image"

export default function InstagramPage() {
  // Sample Instagram posts - replace with actual post data
  const posts = [
    { id: 1, query: "tech tips coding workspace setup" },
    { id: 2, query: "software engineer working on laptop" },
    { id: 3, query: "programming code on screen colorful" },
    { id: 4, query: "tech career advice motivational quote" },
    { id: 5, query: "developer desk setup with multiple monitors" },
    { id: 6, query: "woman coding at computer tech" },
    { id: 7, query: "tech industry career path infographic" },
    { id: 8, query: "software development team collaboration" },
    { id: 9, query: "coding tutorial javascript python" },
    { id: 10, query: "tech workspace aesthetic purple cyan" },
    { id: 11, query: "developer life balance work from home" },
    { id: 12, query: "tech education learning programming" },
  ]

  return (
    <div className="min-h-screen py-8">
      {/* Instagram Grid */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="instagram-grid">
          {posts.map((post) => (
            <div key={post.id} className="instagram-post">
              <Image
                src={`/.jpg?height=400&width=400&query=${encodeURIComponent(post.query)}`}
                alt={`Post ${post.id}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
