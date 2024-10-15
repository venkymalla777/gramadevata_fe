import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abouts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abouts.component.html',
  styleUrl: './abouts.component.css'
})
export class AboutsComponent {

  constructor(){}


  advisors = [
   
   
    {

      name: 'Dr. Anadi Sahoo',
      image: "assets/Dr. Anadi Sahoo.jpg",
      bio: 'Dr. Anadi Sahoo is the Founder of Spiritual Bharat, a Spiritual Educational Institute where academic, social, and religious values are taught. He is also a renowned thought leader in Hinduism and has completed a 12-year Gurukul spiritual training from the Nath Sampradaya. Additionally, he is a spiritual scientist, author, and trainer, known for his profound insights shared through over 150 spiritual articles featured on the Speaking Tree of Times of India. Dr. Sahoo"s commitment is to impart principles and practices for genuine happiness, especially to those earnestly seeking spiritual growth. He also sheds light on the inclusive essence of Hinduism and discusses the intersection of Hinduism with other communities in exercising an inclusive viewpoint.'

    },

    {
      name: 'Dr. B. Srinivasulu',
      image: "assets/srinavas.jpg",
      bio: "Dr. B. Srinivasulu, M.Sc (Ag), Ph.D. Former Registrar, Director of Extension, Controller of Examinations, Principal Scientist, Director -Planning and Monitoring cell at Horticultural University, Andhra Pradesh. Severed as a professor for 21 years and university officer for 14 years in a total service of 39 years. Also held positions as Director of Research, Dean of Horticulture, Dean of Student Affairs, Dean of PG Studies, Director of Industrial and International Programs, Comptroller and Estate Officer. Published 7 books, 8 chapters in textbooks, 60 technical bulletins, 150 research papers and 200 popular articles. Recipient of 13 awards / recognitions."

    }
    
  ];

  founders = [
    
    {
      title:'Chairman',
      name: 'Mr. Soundarajan Narendran',
      image: 'assets/Soundarajan Narendran.jpg',
      bio: 'Soundarajan Narendran is a data scientist with over 25 years of experience in both business and government. From 1998 to 2007, he worked for Apollo Tyres and the TVS Group on product development, business channel development and supply chains. Since 2007, Narendran has worked on policy making, public policy and digital government. He has experience of working with non-governmental organizations, governments and global institutions on big data, social media analytics and sentiment analysis. Educated at IIT Chennai and Anna University, Narendran has an interest in spirituality and narrative development.'
    },

    // {
    //   title: 'Founder & CEO',
    //   name: 'MR. NALABOLU GOVINDA ROY VISHNU SRI',
    //   image: '../../../assets/founder.jpg',
    //   bio: 'A dedicated social reformer and entrepreneur with over 25 years of experience in rural and urban development. As Chairman and Managing Director of Sathayush Tech Solutions Pvt Ltd and Founder-CEO of the Gramadevata Foundation, he has played a pivotal role in developing web and mobile platforms that unite and empower the global Hindu community. His key activities include organizing medical camps in rural areas, providing financial support for underprivileged students, and promoting religious awareness. Mr. Vishnu Roy holds a Bachelor of Science (BSc) and a Master of Computer Applications (MCA) from Osmania University. His work experience includes mentoring thousands of graduates, working as a software consultant in the USA and Singapore, and collaborating on open-source software and bioinformatics projects. He remains deeply connected with a wide range of professionals, including lawyers, doctors, teachers, and media personnel, leveraging these relationships to further his mission of social upliftment and community development.'
    // },

    {
      title: 'Founder & CEO',
      name: 'MR. NALABOLU GOVINDA ROY VISHNU SRI',
      image: '../../../assets/founder.jpg',
      bio: 'MR. NALABOLU GOVINDA ROY VISHNU SRI is a dedicated social reformer and entrepreneur with over 25 years of experience in rural and urban development. As Chairman and Managing Director of Sathayush Tech Solutions Pvt Ltd and Founder-CEO of the Gramadevata Foundation, he has played a pivotal role in developing web and mobile platforms that unite and empower the global Hindu community. His key initiatives include organizing medical camps in rural areas, providing financial support to underprivileged students, and promoting religious awareness. Mr. Vishnu Sri holds a Bachelor of Science (BSc) and a Master of Computer Applications (MCA) from Osmania University. He has mentored thousands of graduates, worked as a software consultant in the USA and Singapore, and collaborated on open-source software and bioinformatics projects. He maintains strong connections with professionals across various fields, including law, medicine, education, and media, using these relationships to further his mission of social upliftment and community development.'
    },    
    

    {
      title:'Director',
      name:'Mr. Sharat',
      image:'../../../assets/Sharat.jpg',
      bio:'Mr. Sharat is an astute, strategic person and an active social worker with a strong foothold in Hindu communities. he holds a rich and productive experience in the arena of social services. His ability to reach out and interact with various strata of the society and his active participation in the establishment of numerous get togethers of Hindu communities  in and around India (Nellore, Nalgonda, Vijayawada, Hyderabad), abroad (UK,USA, Singapore) has earned him accolades. He made healthy relations with local and national leaders and was awarded for remarkable work towards social welfare.'
    }

  ]



}
