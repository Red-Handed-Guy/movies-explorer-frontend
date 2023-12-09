import myAvatar from '../../img/main/Me.jpg'
import Portfolio from '../Portfolio/Portfolio'

export default function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title section-title'>Студент</h2>
      <div className='about-me__columns'>
        <div className='about-me__column'>
          <h3 className='about-me__column-title'>Кирилл</h3>
          <p className='about-me__column-subtitle'>
            Фронтенд-разработчик, 30 лет
          </p>
          <p className='about-me__column-text'>
            Я родился и живу в г.Одинцово МО, закончил факультет "Городского
            кадастра" в ГУЗ. Больше 5 лет работал инженером-фотограмметристом в
            "НИИ ТП". Увлекся сначала версткой сайтов, а затем и
            программированием на JS из-за того, что на предыдущем месте работы
            мне не хватало возможности сразу видеть результат своей работы и
            процесса решения задач. Для более структурированного и
            продуктивного обучения закончил курс по Web-разработке от Я.Практикума. Участвовал в Хакатонах от Яндекс. Сейчас активно ищу работу в сфере Frontend
            разработки.
          </p>
          <a
            className='about-me__column-git link'
            target='_blank'
            rel='noreferrer'
            href='https://github.com/Red-Handed-Guy'>
            Github
          </a>
        </div>
        <img className='about-me__avatar' src={myAvatar} alt='Фото автора' />
      </div>
      <Portfolio />
    </section>
  )
}
