const Hero = () => {

    const title='Content Calendar';
    const subtitle='Track your content so you never miss a deadline';
    return (
        <>
            <section className='bg-indigo-700 py-20 mb-4'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
                    <div className='text-center'>
                        <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl'>
                            {title}
                        </h1>
                        <p className='mt-3 max-w-2xl mx-auto text-lg text-indigo-200 sm:text-lg md:mt-5 md:text-xl'>
                            {subtitle}
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Hero;