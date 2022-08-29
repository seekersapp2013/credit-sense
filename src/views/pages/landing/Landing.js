import Link from 'next/link'
import React, { useState } from 'react'

const Landing = () => {
  return (
    <>
      <div className="text-center">
        <p>Welcome to the landing page, which this is by the way...</p>
        <Link href="/auth" passHref>Click here to Login or Sign Up</Link>
      </div>
    </>
  )
}

export default Landing
