import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='sb_footer_section_padding'>
            <div className='sb_footer-links'>
                <div className='sb_footer-links-div'>
                    <h1 className='statem'>Links</h1>
                    <a href='/'>
                        <p>Home</p>
                    </a>
                    <a href='/categories'>
                        <p>Categories</p>
                    </a>
                    <a href='/favorites'>
                        <p>Favorites</p>
                    </a>
                    <a href='/add-book'>
                        <p>Add Book</p>
                    </a>
                </div>
                <div className='sb_footer-links-div'>
                    <h1 className='statem'>More Info</h1>
                <a href='/about'>
                        <p>About</p>
                    </a>
                    <a href='/contact'>
                        <p>Contact</p>
                    </a>
                </div>
                <div className='socialmedia'>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/_pashy_/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
             </div>
            </div>
        </div>

        <hr></hr>

        <div className='sb_footer-below'>
            <div className='sb_footer-copyright'>
                <p>
                    @{new Date().getFullYear()} Pashy. All rights reserved.
                </p>
            </div>

        </div>
    </div>
  )
}

export default Footer