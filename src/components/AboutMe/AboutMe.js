import myAvatar from '../../img/main/Me.jpg'
import Portfolio from '../Portfolio/Portfolio'

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title section-title">Студент</h2>
      <div className="about-me__content-wrapper">
        <div className="about-me__column">
          <h3 className="about-me__column-title">Кирилл</h3>
          <p className="about-me__column-subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__column-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__column-git link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Red-Handed-Guy">
            Github
          </a>
        </div>
        <img className="about-me__avatar" src={myAvatar} alt="Фото автора" />
      </div>
      <Portfolio />
    </section>
  )
}
