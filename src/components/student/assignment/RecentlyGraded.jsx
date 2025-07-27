import React from 'react'

const RecentlyGraded = ({recentlyGraded}) => {
  return (
    <div>
        {recentlyGraded.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Recently Graded</h2>
          <ul className="space-y-2">
            {recentlyGraded.map((a) => (
              <li key={a.id} className="flex justify-between text-sm text-gray-700">
                <span>{a.title} — {a.subject}</span>
                <span className="font-bold text-green-600">{a.grade}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default RecentlyGraded