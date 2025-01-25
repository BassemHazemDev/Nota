import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="fot border-bottom border-body position-fixed bottom-0 end-0 w-100 text-white mt-5 text-center" data-bs-theme="dark">
                <div className="container">
                    <p className='mb-1'>all rights recived to <span className='myTxt'>Eng.Bassem Hazem Mahmoud</span></p>
                    <div class="info d-flex w-100 justify-content-center align-items-center">
                        <a href="https://github.com/BassemHazemDev" rel="noopener" target="_blank" class="text-decoration-none text-bg-success rounded fw-bold mx-5">Github</a>
                        <a href="https://www.linkedin.com/in/bassem-hazem-7902b32a2/" rel="noopener" target="_blank" class="text-decoration-none text-bg-primary rounded fw-bold mx-5">Linkedin</a>
                    </div>
                </div>
            </div>
        </>
    )
}
