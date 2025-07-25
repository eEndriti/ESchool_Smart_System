import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import homePageBanner from '../../assets/images/homePageBanner.png';
import { GraduationCap,NotebookText,Users,ChartNoAxesCombined,BookOpen,Atom,Languages,Activity,Navigation,PhoneCall,Mail   } from 'lucide-react';
import mapLocation from '../../assets/images/mapLocation.jpg';

const Home = () => {

    const keyFeatures = [
        {
            icon : <GraduationCap className='w-13 h-13'/>,
            title:"Smart Classrooms",
            desc:"Manage Students, and in-class lessons easily"
        },{
            icon : <NotebookText className='w-13 h-13'/>,
            title:"Gradebook",
            desc:"Track Student Progress in Real-Time"
        },{
            icon : <Users className='w-13 h-13'/>,
            title:"Online Forum",
            desc:"Track and Help Solve Current Problems"
        },{
            icon : <ChartNoAxesCombined className='w-13 h-13'/>,
            title:"Reports",
            desc:"Advanced Analytics for Teachers,Admins,Principal,Parents"
        }
    ]

    const curriculumHiglights = [
        {
            icon : <BookOpen  className='w-13 h-13'/>,
            title:"Comprehensive Programs",
            desc:"From foundational subjects to advanced electives,our curriculum is designed!"
        },{
            icon : <Atom  className='w-13 h-13'/>,
            title:"Steam Focus",
            desc:"Emphasizing Science:Technology,Engineering,Arts, and Math"
        },{
            icon : <Languages  className='w-13 h-13'/>,
            title:"Languages & Humanities",
            desc:"Courses that build critical thinking,creativity, and global awareness"
        },{
            icon : <Activity className='w-13 h-13'/>,
            title:"Extracurricular Activities",
            desc:"Sports, Music, Coding Clubs, Leadership Programms"
        }
    ]
    
    const contactInfo = [
        {
            icon:<Navigation  className='w-11 h-11 inline text-blue-600'/>,
            text:"Trivoxo School,123 Learning Avenue,City,Country"
        },
        {
            icon:<PhoneCall className='w-11 h-11 inline text-blue-600'/>,
            text:"+123 456 7890"
        },
        {
            icon:<Mail className='w-11 h-11 inline text-blue-600'/>,
            text:"info@trivoxoSchool.com"
        }
        
    ]

     const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>

        <section className='pt-10' id='home'>
            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                    Empowering Education,
                    <span className="block text-blue-600">Anywhere, Anytime</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-700">
                    Join Our School,
                    <span className="block">Join a Smarter Way of Learning</span>
                    </h2>
                </div>

                <div className="md:w-1/2">
                    <img
                    src={homePageBanner}
                    alt="Home Page Banner"
                    className="w-full h-auto object-contain"
                    />
                </div>
                </div>
        </section>

        <section className='flex flex-col gap-4 my-6' id='features'>
            <h1 className='text-4xl font-semibold m-7'>Key Features</h1>
            <div className='flex flex-row flex-wrap gap-6 place-content-center'>
                {keyFeatures.map((feature,index) => (
                    <div key={index} className='flex flex-col p-4 bg-white shadow-md rounded w-full md:w-1/5 gap-4'>
                        <div className='text-blue-600 text-9xl'>{feature.icon}</div>
                        <p className='text-3xl'>{feature.title}</p>
                        <p className='text-md'>{feature.desc}</p>
                    </div>
                ))}
                
            </div>
        </section>

        <section id="about" className='min-h-screen flex flex-col gap-4   text-white' style={{ backgroundColor: '#212B4B' }}>
                            <h1 className='text-4xl font-semibold m-7'>About US</h1>

          <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold " style={{color:'#E0F2FE'}}>Who We Are?</h1>
                    <p className="bg-white shadow-md rounded-lg p-6 text-lg text-gray-700 leading-relaxed">
                    We are a forward-thinking institution dedicated to providing a world-class education through advanced systems of learning, including technology systems. <br />
                    Our mission is to inspire lifelong learners and compassionate leaders.
                    </p>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold " style={{color:'#E0F2FE'}}>Why Choose Us?</h1>
                    <ul className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    <li>
                        <p className="text-lg text-gray-700 italic">
                        "My child loves going to school every day, and I have never seen him more excited to learn."
                        </p>
                        <p className="mt-2 text-sm text-gray-500">– Parent: Mr. B. Obama</p>
                    </li>
                    <li>
                        <p className="text-lg text-gray-700 italic">
                        "This school prepared me for university better than I ever imagined."
                        </p>
                        <p className="mt-2 text-sm text-gray-500">– Student: J. Bush</p>
                    </li>
                    </ul>
                </div>
                </div>

           <div>
                <h1 className='text-4xl font-semibold m-7 text-center' style={{color:'#E0F2FE'}}>Curriculum Highlights</h1>
                <div className='flex flex-row flex-wrap gap-6 place-content-center py-6'>
                    {curriculumHiglights.map((feature,index) => (
                        <div key={index} className='flex flex-col p-4 bg-white shadow-md rounded w-full md:w-1/5 gap-4'>
                            <div className='text-blue-600 text-9xl'>{feature.icon}</div>
                            <p className='text-3xl text-black'>{feature.title}</p>
                            <p className='text-md text-black'>{feature.desc}</p>
                        </div>
                    ))}
                    
                </div>
           </div>
        </section>

        <section className='flex flex-col gap-4' id='contact'>
            <h1 className='text-4xl font-semibold mt-10 mb-1 mx-7'>Contact & Visit Us</h1>
             <h1 className='text-xl font-semibold text-center' style={{ color: '#212B4B' }}>We'd love to hear from you or welcome you to our campus.</h1>
             <h1 className='text-xl font-semibold text-center' style={{ color: '#212B4B' }}>Reach Out Today!</h1>
             <div className='flex flex-col gap-6 place-content-center'>
                <div className='flex flex-row flex-wrap justify-around m-5'>
                    {contactInfo.map((e,i) => (
                        <div key={i} className='rounded  p-5 justify-center'>
                                {e.icon}
                            <p className='inline text-xl p-5'>{e.text}</p>
                        </div>
                    ))}
                </div>
                
                <div className='flex flex-row flex-wrap gap-6 place-content-center mt-10'>
                    <div>
                        <div>
                            <img src={mapLocation} alt="Location in Map" />
                        </div>
                        <div className='my-5 justify-center text-center'>
                            <h1 className='text-4xl text-black font-semibold'>Visit Our School</h1>
                            <p className='w-150 my-2 text-xl text-gray-800'>We welcome families and students to tour our modern facilities.Schedule your visit to experience our classrooms,labs,library, and sports areas.</p>
                        </div>
                    </div>
                <div className="   bg-white shadow-md rounded-lg space-y-6 w-120">
                    <h1 className="text-3xl font-semibold text-gray-800 text-center">Contact Form</h1>

                    <div className="flex flex-col space-y-4 mx-10">
                        <input
                        type="text"
                        placeholder="Name..."
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                        type="email"
                        placeholder="Email..."
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                        type="tel"
                        placeholder="Phone..."
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                        placeholder="Your Message..."
                        rows="5"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>
                        <button
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        >
                        Send Message
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </section>

        <footer className='text-center mt-25 mb-5 text-xl font-semibold'>© Trivoxo School - One School,One Community</footer>
    </>
  );
};

export default Home;
