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
      name: ' Soundarajan Narendran',
      image: 'assets/Soundarajan Narendran.jpg',
      bio: 'Soundarajan Narendran is a data scientist with over 25 years of experience in both business and government. From 1998 to 2007, he worked for Apollo Tyres and the TVS Group on product development, business channel development and supply chains. Since 2007, Narendran has worked on policy making, public policy and digital government. He has experience of working with non-governmental organizations, governments and global institutions on big data, social media analytics and sentiment analysis. Educated at IIT Chennai and Anna University, Narendran has an interest in spirituality and narrative development.'
    },

    {
      title:'Founder & CEO',
      name:'Dr. Nalabolu Vishnu Roy',
      image:'../../../assets/founder.jpg',
      bio:'Dr. Nalabolu Vishnu Roy is the founder of Gramadevata Foundation, a company dedicated to providing innovative technology solutions. With a passion for driving technological advancements and fostering growth, Vishnu Roy has led the company with a vision to create impactful tech solutions that address real-world challenges. Under his leadership, Sathayush Tech Solutions has achieved significant milestones and continues to be at the forefront of technological innovation.',
    },

    {
      title:'Director',
      name:'Mr. Sharat',
      image:'../../../assets/Sharat.jpg',
      bio:'Mr. Sharat is an astute, strategic person and an active social worker with a strong foothold in Hindu communities. he holds a rich and productive experience in the arena of social services. His ability to reach out and interact with various strata of the society and his active participation in the establishment of numerous get togethers of Hindu communities  in and around India (Nellore, Nalgonda, Vijayawada, Hyderabad), abroad (UK,USA, Singapore) has earned him accolades. He made healthy relations with local and national leaders and was awarded for remarkable work towards social welfare.'
    }

  ]



}
