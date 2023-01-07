<script>
  import "/src/lib/webcomponents/my-experience.js";
  import "/src/lib/webcomponents/my-presentation.js";

  import BadgeSimple from "../../lib/components/common/card/BadgeSimple.svelte";
  function imprimer_page() {
    window.print();
  }
</script>

<div class="cv-container u-print">
  <div class="header">
    <div style="display: flex;justify-content: space-between;">
      <h1>Julien <span class="text-blue text-uppercase">ILARI</span></h1>
      <div class="u-no-print">
        <div style="display: flex;">
          <!-- svelte-ignore a11y-missing-content -->
          <input
            style="background : url('images/ico_print_24.png') no-repeat ;
          display:block;height: 24px;width:24px;"
            id="impression"
            name="impression"
            type="button"
            on:click={imprimer_page}
          />
          <!-- svelte-ignore a11y-missing-content -->
          <a
            style="background : url('images/ico_pdf_24.png') no-repeat ;
          display:block;height: 24px; width:24px;"
            href="/cv.pdf"
            target="_blank"
          />
        </div>
      </div>
    </div>
    <span>Développeur Fullstack JAVA</span>

    <ul class="infos">
      <li>
        <i class="icon fas fa-at text-blue" />
        <a href="mailto:julien.ilari@gmail.com">julien.ilari@gmail.com</a>
      </li>
      <li><i class="icon fas fa-phone text-blue" /> 06 73 20 06 25</li>
      <li>
        <i class="icon fas fa-map-marker-alt text-blue" /> 29, rue frédéric Mistral
        Aubagne 13400
      </li>
    </ul>
  </div>
  <div class="left-column">
    <img alt="" class="portait" src="/images/photo.jpg" />
    <div class="section">
      <p>
        <i class="icon fab fa-linkedin text-darkblue" /> Julien ILARI
      </p>
    </div>
    <div class="section">
      <h2>À PROPOS</h2>
      <p>
        Le développement <strong>Back-End</strong> est une de mes passions : concevoir,
        développer et maintenir des services métiers et des API REST.
      </p>
      <p>
        Sérieux, adaptable, autonome et passionné, j’aime apprendre de nouvelles
        technologies, passer du temps à résoudre des problèmes et réaliser du
        code de qualité.
      </p>
    </div>
    <div class="section">
      <h2>COMPÉTENCES</h2>
      <ul class="skills">
        <li>
          <i class="icon fas fa-check-circle text-darkblue" />
          HTML5 &#124; CSS3 &#124; Javascript
        </li>
        <li><i class="icon fas fa-check-circle text-darkblue" /> SVELTE</li>
        <li><i class="icon fas fa-check-circle text-darkblue" /> REACT</li>
        <li>
          <i class="icon fas fa-check-circle text-darkblue" /> GWT &#124; Spring
          Web MVC
        </li>
        <li>
          <i class="icon fas fa-check-circle text-darkblue" /> JAVA EE (JSF,CDI,EJB,JPA
          ...)
        </li>
        <li><i class="icon fas fa-check-circle text-darkblue" /> SPRING</li>
        <li>
          <i class="icon fas fa-check-circle text-darkblue" /> QUARKUS (MicroProfile)
        </li>
        <li><i class="icon fas fa-check-circle text-darkblue" /> LOMBOOK</li>
        <li>
          <i class="icon fas fa-check-circle text-darkblue" /> MAPSTRUCT
        </li>
        <li>
          <i class="icon fas fa-check-circle text-darkblue" /> API RESTful
        </li>
        <li>
          <i class="icon fas fa-check-circle text-darkblue" /> Hateoas | Json:API
        </li>
        <li>
          <i class="icon fas fa-check-circle text-darkblue" /> Git &#124; Github
        </li>
        <li>
          <i class="icon fas fa-check-circle text-darkblue" /> SONAR CLOUD
        </li>
      </ul>
    </div>
    <div class="section">
      <h2>Centres d'intérêt</h2>
      <p>
        Jeux vidéo, développer, Sport,
        <br />
        Informatique en général
      </p>
    </div>
  </div>
  <div class="right-column">
    <div class="header">
      <div style="display: flex;justify-content: space-between;">
        <h1>Julien <span class="text-blue text-uppercase">ILARI</span></h1>
        <div class="u-no-print">
          <div style="display: flex;">
            <!-- svelte-ignore a11y-missing-content -->
            <input
              style="background : url('images/ico_print.png') no-repeat ;
          display:block;height: 64px;width:64px;"
              id="impression"
              name="impression"
              type="button"
              on:click={imprimer_page}
            />
            <!-- svelte-ignore a11y-missing-content -->
            <a
              href="/cv.pdf"
              target="_blank"
              style="background : url('images/ico_pdf.png') no-repeat ;
          display:block;height: 64px;width:64px;"
            />
          </div>
        </div>
      </div>
      <p>Développeur Fullstack JAVA</p>
      <ul class="infos">
        <li>
          <i class="icon fas fa-at text-blue" />
          <a href="mailto:julien.ilari@gmail.com">julien.ilari@gmail.com</a>
        </li>
        <li><i class="icon fas fa-phone text-blue" /> 06 73 20 06 25</li>
        <li>
          <i class="icon fas fa-map-marker-alt text-blue" /> 29, rue frédéric Mistral
          Aubagne 13400
        </li>
      </ul>
    </div>

    <div class="content">
      <div class="section">
        <article>
          <header>
            <h2>
              Projets <br /><span class="text-blue">personnels</span>
            </h2>
          </header>

          <span
            >Projet
            <a href="https://quarkus.io/" title="SUPERSONIC/SUBATOMIC/JAVA"
              >Quarkus</a
            >
            (Java 11) sous
            <a
              href="https://github.com/Multi-commerces/rest-api/tree/master/webmaker-business"
              title="projet github quarkus">github</a
            >
            , API RESTful (implementation
            <a href="https://jsonapi.org/" title="Latest Specification (v1.1)">
              Hateoas Json:API
            </a>)
          </span>

          <br />
          <BadgeSimple value="MicroProfile (4.0)" />
          <BadgeSimple value="Hateoas Json:API" />
          <BadgeSimple value="RESTEasy" />
          <BadgeSimple value="Jackson" />
          <BadgeSimple value="MapStruct" />
          <BadgeSimple value="Lombok" />
          <BadgeSimple value="hibernate-orm-panache" />
          <BadgeSimple value="Docker" />
          <BadgeSimple value="Swagger" />
          <BadgeSimple value="Nginx" />
          <BadgeSimple value="Postgres" />
          <BadgeSimple value="Keycloak" />
          <BadgeSimple value="GitHub" />
        </article>

        <nord-divider style="margin: 1rem 0" />

        <article>
          Projet JAVA EE 8 (deprecated) avec
          <a href="https://openliberty.io/">Open Liberty</a>
          sous
          <a
            href="https://github.com/julien-ilari/mycommerce-ws-client/tree/master/mycommerce-parent-rest/remote/src/main/java/fr/mycommerce/service"
            title="projet github Open Liberty"
          >
            github
          </a>
          <br />
          <BadgeSimple value="microProfile (3.3)" />
          <BadgeSimple value="JAVA EE 8 (JSF, CDI, JPA, ...)" />
          <BadgeSimple value=" JSF(myfaces) + omnifaces + primefaces" />
          <BadgeSimple value="Lombok" />
          <BadgeSimple value="MapStruct" />
          <BadgeSimple value="deltaspike" />
          <br />
        </article>

        <nord-divider style="margin: 1rem 0" />

        <article>
          Svelte (+ nordhealth) + vite <br />
          Projet sous
          <a href="https://github.com/Multi-commerces/svelte">github</a>
        </article>
      </div>

      <div class="section">
        <header>
          <h2>
            Expérience <br /><span class="text-blue">professionelle</span>
          </h2>
        </header>
        <article>
          <header>
            <h3>
              juil. 2020 <i class="fas fa-long-arrow-alt-right" /> aujourd'hui
            </h3>
            <p>
              <sapn
                >Développeur Fullstack Java chez <em>OCEAN (Orange BS)</em
                ></sapn
              >
            </p>
          </header>
          <article class="mission">
            <header>
              <h4>OceanV3, logiciel de Gestion de Flotte</h4>
            </header>
            Projets en équipe, utilisation quotidienne de JIRA, JETKINS et Git
            <ul class="experience-list">
              <li>développement GWT (SPRING web mvc, java 11)</li>
              <li>développement du nouveau front en REACT</li>
            </ul>
            <div>
              Environnement : <br />
              <span
                >JIRA, SWAGGER, POSTMAN, DOCKER, JETKINS, GWT, Spring, Java 11,
                Postgres, Git</span
              >
            </div>
          </article>
        </article>

        <nord-divider style="margin: 1rem 0" />

        <article class="experience">
          <header>
            <h3>
              juil. 2018 <i class="fas fa-long-arrow-alt-right" /> juil. 2020
            </h3>
            <p>
              <span
                >Développeur Java chez <em>Inetum (GFI Informatique)</em></span
              >
            </p>
          </header>
          <div>
            <div style="display: flex; flex-direction: row;">
              <article class="mission">
                <header>
                  <h4>CPR SNCF, Développeur Java</h4>
                  <i>Juil. 2018 - Juil. 2020 - 2ans</i>
                </header>
                <div>
                  <ul class="experience-list">
                    <li>Correction et évolution des applications Java EE</li>
                    <li>Réécriture d'une application JSF 1 en JSF 2.x</li>
                    <li>
                      Rédiger la documentation technique et le rapport de tests
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </article>

        <nord-divider style="margin: 1rem 0" />

        <article class="experience">
          <header>
            <h3>
              aoùt. 2010 <i class="fas fa-long-arrow-alt-right" /> juil. 2018
            </h3>
            <p>
              <sapn>Concepteur développeur chez <em>Atos (BULL)</em></sapn>
            </p>
          </header>
          <div>
            <div style="display: flex; flex-direction: row;">
              <div class="line" style="height:5.2rem" />
              <article class="mission">
                <span class="node" />
                <header>
                  <h4>CPR SNCF, Maintenance des applications OMNIS7 et Java</h4>
                  <i>janv. 2016 - Juil. 2018 - 3ans 7mois</i>
                </header>
                <div>
                  <ul class="experience-list">
                    <li>
                      Correction et évolution des applications OMNIS7 et Java EE
                    </li>
                    <li>
                      Rédiger la documentation technique et le rapport de tests
                    </li>
                  </ul>
                </div>
                <div>
                  Environnement : <span
                    >Java EE 5, Java EE 7, Weblogic, Oracle, SVN</span
                  >
                </div>
              </article>
            </div>
          </div>

          <div style="display: flex; flex-direction: row;">
            <div class="line u-no-print" style="height:8rem" />
            <article class="mission">
              <span class="node" />
              <header>
                <h4>ACCOSS, Intégrateur technique</h4>
                <i>mars. 2015 - déc. 2015 - 10mois</i>
              </header>
              <div class="u-no-print">
                Installation des livrables de la MOE, tests techniques,
                réalisation de campagne ALM.
                <ul class="experience-list">
                  <li>Réalisation de la documentation</li>
                  <li>Formation de back up</li>
                </ul>
                <div>
                  Environnement : <br />
                  <span
                    >Outils ALTAIR (Redmine, ALM), Supervision Nagios, Linux,
                    Windows</span
                  >
                </div>
              </div>
            </article>
          </div>

          <div style="display: flex; flex-direction: row;">
            <div class="line u-no-print" style="height:8rem" />
            <article class="mission">
              <span class="node" />
              <header>
                <h4>MNCA, Assistance et support des logiciels métiers</h4>
                <i>janv. 2015 - mars. 2015 - 3mois</i>
              </header>
              <div class="u-no-print">
                Missions d’assistance et de support pour l’administration des
                logiciels métiers de la collectivité
                <ul class="experience-list">
                  <li>Support et suivi des demandes client</li>
                  <li>Manipulation de données (SQL)</li>
                  <li>Création de packages d’installation MSI</li>
                  <li>Alertes et reporting au chef de projet</li>
                </ul>
              </div>
            </article>
          </div>

          <div style="display: flex; flex-direction: row;">
            <div class="line u-no-print" style="height:6.5rem" />
            <article class="mission">
              <span class="node" />
              <header>
                <h4>CPR SNCF, Maintenance des applications OMNIS7 et PL/SQL</h4>
                <i>mars. 2014 - janv. 2015 - 11mois</i>
              </header>
              <div class="u-no-print">
                Correction et évolution des applications
                <ul class="experience-list">
                  <li>
                    Traitement des demandes de corrections et/ou d’évolutions
                  </li>
                  <li>
                    Rédiger la documentation technique et le rapport de tests
                  </li>
                  <li>Formation d’un backup OMNIS7</li>
                </ul>
              </div>
            </article>
          </div>

          <div style="display: flex; flex-direction: row;">
            <div class="line u-no-print" style="height:4rem" />
            <article class="mission">
              <span class="node" />
              <header>
                <h4>
                  Ministère de l’intérieur, Système Immatriculation des
                  véhicules
                </h4>
                <i>févr. 2014 - mars. 2014 - 2mois</i>
              </header>
              <div class="u-no-print">
                Qualification/Test
                <ul class="experience-list">
                  <li>Rédaction des cas de test</li>
                </ul>
              </div>
            </article>
          </div>

          <div style="display: flex; flex-direction: row;">
            <div class="line u-no-print" style="height:9.5rem" />
            <article class="mission">
              <span class="node" />
              <header>
                <h4>
                  DSNA, Gestionnaire de stock (renar ip et x25) à Toulouse
                </h4>
                <i>aoùt. 2013 - févr. 2014 - 7mois</i>
              </header>
              <div class="u-no-print">
                Gestionnaire du stock RENAR IP, RENAR X25
                <ul class="experience-list">
                  <li>Gestion du stock d’équipement réseau</li>
                  <li>
                    Respect des délais de prise en charge et de traitement des
                    interventions
                  </li>
                  <li>Reporting mensuel au chef de projet</li>
                  <li>Réalisation de documentation</li>
                  <li>Formation de backups</li>
                </ul>
              </div>
            </article>
          </div>

          <div style="display: flex; flex-direction: row;">
            <div class="line u-no-print" style="height:8rem" />
            <article class="mission">
              <span class="node" />
              <header>
                <h4>
                  MEDDE, Le ministère de l'Ecologie, du Développement durable et
                  de l'Energie
                </h4>
                <i>janv. 2013 - juil. 2013 - 7mois</i>
              </header>
              <div class="u-no-print">
                Développement/Test Java
                <ul class="experience-list">
                  <li>développement Java EE</li>
                  <li>Réalisation des tests JUnit</li>
                </ul>
                <div>
                  Environnement : <br />
                  <span
                    >Postgres, Java EE, HTML, CSS, Spring, Hibernate, Struts 1,
                    Eclipse, JUnit, SVN.</span
                  >
                </div>
              </div>
            </article>
          </div>

          <div style="display: flex; flex-direction: row;">
            <div class="line u-no-print" style="height:12rem" />
            <article class="mission">
              <span class="node" />
              <header>
                <h4>DCNS, TRA et Gestion de configuration (clear case)</h4>
                <i>mars. 2012 - déc. 2012 - 10mois</i>
              </header>
              <div class="u-no-print">
                TRA et Gestion de configuration Projet GEMO
                <ul class="experience-list">
                  <li>Utilisation de Clearcase</li>
                  <li>Vérification des FV</li>
                  <li>Lancement des tests auto et manuels</li>
                  <li>
                    Estimation des charges et le reste à faire par tâche
                    unitaire
                  </li>
                  <li>
                    Création de scripts shell pour améliorer les temps de
                    traitement
                  </li>
                </ul>
                <div>
                  Environnement : <br />
                  <span>ClearCase, Quality Center, Linux.</span>
                </div>
              </div>
            </article>
          </div>

          <div style="display: flex; flex-direction: row;">
            <div class="line u-no-print" style="height:12rem" />
            <article class="mission">
              <span class="node" />
              <header>
                <h4>DCNS, Centre de service, Front Office et back office</h4>
                <i>nov. 2010 - mars. 2012 - 1an 5mois</i>
              </header>
              <div class="u-no-print">
                Projets DSNS dans le périmètre du centre de service (GEMO,
                FREMM, INDE, …).<br />
                Les utilisateurs passent par le centre de services pour toute « demande
                de service » ou « incident ».
                <ul class="experience-list">
                  <li>Relation client</li>
                  <li>Prise en compte et traitement des demandes de service</li>
                  <li>
                    Gestion des comptes utilisateurs : Sforge, SforgeProject,
                    ClearQuest, ClearCase, Quality Center, DOORS, …
                  </li>
                  <li>Modification (évolution) des scripts perl</li>
                </ul>
                <div>
                  Environnement : <br />
                  <span
                    >Sforge, SforgeProject, ClearQuest, ClearCase, Quality
                    Center, DOORS, Linux (env. production)/Windows.</span
                  >
                </div>
              </div>
            </article>
          </div>
        </article>
      </div>
    </div>
  </div>
</div>

<style>
  /* GENERAL */
  * {
    margin: 0;
    box-sizing: border-box;
  }

  @media print {
    .section header h2 {
      display: flex;
      justify-content: space-around;
    }
    .node,
    .line,
    .mission > div,
    .experience > div {
      display: none !important;
    }

    ul.infos {
      columns: 1;
    }

    .left-column {
      display: block;
      padding-top: 5pt;
      padding-right: 15pt !important;
      padding-bottom: 5pt;
      padding-left: 15pt !important;
      width: 250pt;
    }

    .content {
      padding: 15pt !important;
    }
    .right-column {
      display: block;
    }

    .header {
      display: block;
    }

    .right-column ul {
      display: block;
    }

    p {
      margin: 0pt;
    }
  }

  @media only screen and (max-width: 768px) {
    :root {
      --n-layout-padding: 0;
    }

    .line {
      top: 1rem !important;
      height: auto !important;
    }

    .cv-container > .header {
      display: block !important;
      visibility: visible !important;
    }

    .right-column .header {
      display: none;
      visibility: hidden;
    }

    /* For mobile phones: */
    .cv-container {
      display: block !important;
      width: 100%;
    }
    .cv-container > div {
      display: block;
      width: 100%;
    }

    ul.infos {
      columns: 1;
    }
  }

  .cv-container {
    font-family: Roboto;
    font-weight: 300;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .cv-container > .header {
    visibility: hidden;
    display: none;
  }

  a {
    text-decoration: none;
    color: #4472c4;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    margin: 0 0 1rem;
  }

  h1 {
    margin: 0 0 1rem;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0 0 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .text-blue {
    color: #4472c4;
  }

  .text-darkblue {
    color: #002060;
  }

  .text-uppercase {
    text-transform: uppercase;
  }

  .icon {
    margin-right: 0.5rem;
  }

  .cv-container {
    display: inline-grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "left-column right-column right-column";
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .section {
    margin-bottom: 1.5rem;
  }

  /* LEFT COLUMN */
  .left-column {
    grid-area: left-column;
    padding-top: 50px;
    padding-right: 30px;
    padding-bottom: 50px;
    padding-left: 30px;
    /* background-color: #4472c4; */
    background-color: #395b97;
    color: white;
  }

  .portait {
    border-radius: 50%;
    max-width: 150px;
    margin: auto;
    display: block;
    margin-bottom: 50px;
  }

  .skills {
    list-style-type: none;
    padding: 0;
    font-size: 1.1rem;
    letter-spacing: 1px;
    margin: 0 0 1rem;
  }

  /* RIGHT COLUMN */
  .right-column {
    grid-area: right-column;
    display: grid;
    grid-template-rows: 250px 1fr;
    grid-template-areas:
      "header"
      "content";
  }

  /* HEADER */
  .header {
    grid-area: header;
    padding: 50px;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .infos {
    columns: 2;
    list-style-type: none;
    padding: 0;
  }

  /* CONTENT */
  .content {
    grid-area: content;
    padding: 50px;
  }

  .content .experience {
    margin-top: 1rem;
  }

  .experience-list {
    list-style-type: circle;
  }

  .experience-list {
    margin-left: 1.4rem;
  }

  .mission {
    margin-left: 1rem;
  }

  .line {
    border-left: groove;
    padding-top: 2.5rem;
    position: relative;
    top: 1.25rem;
    height: calc(100% + 2.5rem);
  }

  .node {
    position: relative;
    display: block;
    border-radius: 50%;
    height: 0.7rem;
    width: 0.7rem;
    background-color: #002060;
    top: 0.25rem;
    left: -1.5rem;
    margin-bottom: calc(0.8rem * -1);
  }
</style>
