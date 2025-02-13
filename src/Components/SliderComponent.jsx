import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../CSS/slider.css"
import DevicesIcon from '@mui/icons-material/Devices';
import { Link } from 'react-router';


const SliderComponent = (props) => {

    const { where, data } = props
    // console.log(where);
    // console.log(data);
    
    const settings = {
        accessibility: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: where === "poster" ? 1 : 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: where === "poster" ? 1 : 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: where === "poster" ? 1 : 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };


    return (
        <>
            {where === "poster" ? <Slider {...settings}>
                <div className='h-[230px] sm:h-[350px]'>
                    <img style={{ width: "100%", height: "100%" }} src="https://www.mactrast.com/wp-content/uploads/2018/12/iPhone_XR_-_Apple.jpg" alt="" />
                </div>
                <div className='h-[230px] sm:h-[350px]'>
                    <img style={{ width: "100%", height: "100%" }} src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/8d2de057067171.59c7bfd0a5839.jpg" alt="" />
                </div>
                <div className='h-[230px] sm:h-[350px]'>
                    <img style={{ width: "100%", height: "100%" }} src="https://www.driving.co.uk/wp-content/uploads/sites/5/2021/05/BMA-AI-art-car-05.jpg" alt="" />
                </div>
                <div className='h-[230px] sm:h-[350px]'>
                    <img style={{ width: "100%", height: "100%" }} src="https://marketingweek.imgix.net/content/uploads/2024/04/10103815/PUMA-FOREVER-FASTER_BRAND-CAMPAIGN_Jack-Grealish.jpg" alt="" />
                </div>

            </Slider> : where === "categories" ?
                <Slider {...settings}>

                    {data?.map((category) => {
                        return  <div key={category.name} className='w-[170px] h-[140px]  px-2'>

                            <Link to={`/products/category/${category.slug}`}>
                            <div className='items-center justify-center gap-1 flex-col w-full h-full flex border-2 rounded-md border-neutral-300  text-2xl font-bold cursor-pointer hover:bg-neutral-100 duration-[0.3s] transition-all ease-in-out'>
                                <DevicesIcon style={{ width: "30px", height: "30px" }} />
                                <h1 >{category.name}</h1>
                            </div>
                            </Link>
                        </div>
                    })}








                </Slider>
                : ""
            }

        </>
    )
}

export default SliderComponent
