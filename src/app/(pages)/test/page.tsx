import React from 'react'
import CollectionItemSkeleton from "../../../components/collectionItemSkeleton"



const page = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
          <CollectionItemSkeleton key={i} />
        ))}
    </div>
  )
}

export default page
