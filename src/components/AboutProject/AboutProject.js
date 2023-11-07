export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title section-title">О проекте</h2>
      <div className="about-project__columns">
        <div className="about-project__column">
          <h3 className="about-project__column-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__column-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__column-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__column-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__line">
        <div className="about-project__line-column about-project__line-column_type_one-week">
          <p className="about-project__line-week about-project__line-week_color_green">1 неделя</p>
          <p className="about-project__line-subtitle">Back-end</p>
        </div>
        <div className="about-project__line-column about-project__line-column_type_four-week">
          <p className="about-project__line-week about-project__line-week_color_gray">4 недели</p>
          <p className="about-project__line-subtitle">Front-end</p>
        </div>
      </div>
    </section>
  )
}
