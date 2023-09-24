import React, { useEffect } from 'react'
import blahImageUrl from '../assets/blahblahblah.png'

const AboutPage: React.FC = () => {
  useEffect(() => {
    console.log('Hi')
  }, [])

  return (
    <>
      <p className="mb-3">Blah blah blah blah blah blah blah</p>
      <img src={blahImageUrl} alt="Blah blah blah" />
    </>
  )
}

export default AboutPage
