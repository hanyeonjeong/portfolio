//main

//스크롤값구하기
var s = skrollr.init();
			window.addEventListener("scroll", function () {
				let scroll =
					document.documentElement.scrollTop ||
					window.scrollY ||
					window.pageYOffset;
				document.querySelector(".scroll").innerText = parseInt(scroll);
			});

let animationOn = false;

$(window).on('scroll', () => {
    const st = $(window).scrollTop()
    const wh = $(window).height()

    if ($('#about').offset().top <= st + wh) {
        
        if (animationOn === false) {
            animationOn = true
            animation()
        }
        
    }


    if ($('.project').offset().top <= st && st <= $('.project').offset().top + $('.project').height() - $(window).height()) {
        $('.fixed-wrap').css({
            left: -(st - $('.project').offset().top) + 'px'
        })
    }
})

const tl = gsap.timeline();
tl.to(".rainbow", {duration: 1, opacity:1}, "2")
tl.to(".up-line", {duration: 0.5, opacity:1, top: "0"}, "a")
tl.to(".desc", {duration: 0.5, opacity:1, bottom: "0"}, "a")
tl.fromTo(".face", 
                {opacity:0, width: "100vw", height: "100vw"},
                {opacity:1, width: "20vw", height: "20vw", duration: 0.5, ease:"bounce.out"}, "+=1");

                

//about페이지
$(window).on("scroll", ()=>{
    let scrollValue = $(document).scrollTop() + $(window).height()/1.5;
    let text1top = $(".about-txt .text1").offset().top
    let text2top = $(".about-txt .text2").offset().top
    let text3top = $(".about-txt .text3").offset().top
    let text4top = $(".about-txt .text4").offset().top
    console.log(text1top);
    console.log(scrollValue);

    if(scrollValue >= text1top) {
        gsap.to(".about-txt .text1", {duration: 1, opacity:1, y:0})
    }
    if(scrollValue >= text2top) {
        gsap.to(".about-txt .text2", {duration: 1, opacity:1, y:0})
    }
    if(scrollValue >= text3top) {
        gsap.to(".about-txt .text3", {duration: 1, opacity:1, y:0})
    }
    if(scrollValue >= text4top) {
        gsap.to(".about-txt .text4", {duration: 1, opacity:1, y:0})
    }
})

//start페이지
let speed = 0
        let acc = 0
        let hover = false
        let width
        let times
        let cloned = []

        const item = document.querySelector('.menu--item')
        const word = item.querySelector('.menu--word')


        /*--------------------
        Calculate
        --------------------*/
        const calculate = () => {
            console.log('cloned', cloned)
            cloned.forEach(i => {
                i.parentNode.removeChild(i)
        })
        cloned = []
        
        width = Math.ceil(word.clientWidth)
        times = Math.ceil(window.innerWidth / width)
        
        item.style.width = `${(times + 1) * width}px`

        for (let i = 0; i < times + 1; i++) {
            const clone = word.cloneNode(true)
                word.parentNode.appendChild(clone)
                cloned.push(clone)
            }
        }
        

        /*--------------------
        Listeners
        --------------------*/
        const handleMouse = bool => hover = bool
        item.addEventListener('mouseenter', () => {handleMouse(true)})
        item.addEventListener('touchstart', () => {handleMouse(true)})
        item.addEventListener('mouseleave', () => {handleMouse(false)})
        item.addEventListener('touchend', () => {handleMouse(false)})
        window.addEventListener('resize', calculate)
        window.addEventListener('load', calculate)


        /*--------------------
        Animate
        --------------------*/
        const animate = () => {
        // Acceleration
        acc += 0.1
        if (hover) {
            acc -= 0.35
        }
        
        // Min/Max accelearion
        acc = Math.min(10, Math.max(0, acc))
        
        // Add acceleration to speed
        speed += acc
        
        // Text Loop
        if (speed >= width) {
            speed = 0
        }
        
        // CSS Text
        item.style.transform = `translateX(${-speed}px) skewX(${-2 * acc}deg)`
        
        // RaF
        requestAnimationFrame(animate)
        }
        animate()