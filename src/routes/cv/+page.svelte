<script>
  import "/src/lib/webcomponents/my-experience.js";
  import "/src/lib/webcomponents/my-presentation.js";
  import code from 'svelte-awesome/icons/code';
  import globe from 'svelte-awesome/icons/globe';
  import connectdevelop from 'svelte-awesome/icons/connectdevelop';
  import Icon from "svelte-awesome";
  import BadgeSimple from "../../lib/components/common/card/BadgeSimple.svelte";
</script>

<div id="cv">
  <section>
    <nord-card>
      <header slot="header">
        <h2>Développeur JAVA Full Stack</h2>
      </header>
      <nord-stack class="stack" direction="vertical">
        <article style="height:150px">
          <my-presentation img="photo.jpg" img-size="140px">
            <nord-stack class="stack" direction="vertical">
              <div>
                <h4>Julien ILARI 35ans</h4>
                <span>
                  né le 28/09/1987 à Marseille
                </span>
              </div>
              <address style="align-items: flex-end;">
                <span>29 rue Frédérique Mistral, 13400 Aubagne</span>
                <br/>
                <a href="mailto:julien.ilari@gmail.com">
                  julien.ilari@gmail.com
                </a>
                <br />
                <a href="tel:+33673200625">(+33)6.73.20.06.25</a>
              </address>
            </nord-stack>
          </my-presentation>
          <BadgeSimple value="Autonome" type="warning" />
          <BadgeSimple value="Adaptable" type="warning" />
          <BadgeSimple value="Bon relationnel" type="warning" />
          <BadgeSimple value="Passionné"  type="warning" />
        </article>
       <br />

        <article id="competences" >
          <header>
            <h3><Icon data={code} />Compétences clés</h3>
          </header>
          <div>
            <BadgeSimple value="HTML/CSS/Javascript" />
            <BadgeSimple value="SVELTE" />
            <BadgeSimple value="Java 11" />
            <BadgeSimple value="GWT/Spring Web MVC" />
            <BadgeSimple value="Java EE (JSF, CDI, EJB, JPA ...)" />
            <BadgeSimple value="JSF 2.x (primeFaces, Omnifaces)" />
            <BadgeSimple value="SPRING" />
            <BadgeSimple value="QUARKUS/MICROPROFILE 4.0" />
            <BadgeSimple value="LOMBOK" />
            <BadgeSimple value="MAPSTRUCT" />
            <BadgeSimple value="DOCKER" />
            <BadgeSimple value="KEYCLOCK" />
            <BadgeSimple value="WEBLOGIC" />
            <BadgeSimple value="POSTGRES" />
          </div>
          <br />

          <nord-stack alignItems="stretch"  justifyContent="space-around"
          direction="horizontal" gap="l" responsive="true">
            <article>
              <h4>
                <Icon data={connectdevelop}/>
                <span>Développement RestFul Web-Service</span>
              </h4>
              <ul>
                <li>
                  <a href="https://quarkus.io/"
                    title="SUPERSONIC/SUBATOMIC/JAVA">Quarkus</a>
                  <span>Microprofile (hibernate-orm-panache)</span>
                  <ul>
                    <li>
                      projet (DRAFT) 
                      <a href="https://github.com/Multi-commerces/rest-api/tree/master/webmaker-business"
                        title="projet github quarkus">github</a>
                    </li>
                    <li>
                      <a href="https://jsonapi.org/" title="Latest Specification (v1.1)">
                      Hateoas Json:API
                      </a> Hateoas
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://openliberty.io/">Open Liberty</a>
                  Microprofile (deltaspike-data)
                  <ul>
                    <li>
                      projet (deprecated)
                      <a href="https://github.com/julien-ilari/mycommerce-ws-client/tree/master/mycommerce-parent-rest/remote/src/main/java/fr/mycommerce/service"
                        title="projet github Open Liberty">
                        github
                      </a>
                    </li>
                  </ul>
                </li>
                <li>Svelte (+ nordhealth) + vite</li>
              </ul>
            </article>
          </nord-stack>
        </article>
      </nord-stack>
    </nord-card>
  </section>

  <nord-divider class="n-margin-m" />

  <section>
    
    <nord-card padding="none">
      <header slot="header">
        <h2>Expérience</h2>
        <div>Actuellement Chez Ocean (Orange BS) depuis <i>Juillet 2020</i></div>
      </header>
      <article style="margin: 1rem 0">
        <header>
          <my-presentation title="OCEAN (Orange BS) | 2020-aujourd'hui (2ans 5mois)"
            img="ocean.png" img-height="45px" img-width="95px">
            860 Rue René descartes à AIX-EN-PROVENCE (13100)
          </my-presentation>
        </header>
        <my-experience title="Développeur Fullstack java">
          <li>GWT avec Spring Web MVC (java 11) et Hybernate, base de données postgres</li>
          <li>React (Nouveau front) + 
            <a href="https://boosted.orange.com/"  title="Orange Boosted with Bootstrap">
            FrameWork css boosted
            </a>
          </li>
        </my-experience>
      </article>

     

      <article style="margin: 1rem 0">
        <header>
          <my-presentation title="Inetum (GFI Informatique) | 2018-2020 (2ans)"
            img="gfi.jpg" img-height="45px" img-width="95px">
            140 Av. du 12 Juillet 1998, 13290 AIX-EN-PROVENCE
          </my-presentation>
        </header>

        <my-experience title="CPR SNCF, Développeur Java EE (Java 8) | Juil. 2018 - Juil. 2020 - 2ans">
          <li>Serveur d'application (Java EE) <i>WebLogic</i> | Base de données <i>Oracle 12</i></li>
          <li>JSF 2 (primeFaces, Omnifaces), CDI, Bean Validation, EJB 2 et JPA</li>
        </my-experience>
        
        <article style="margin: 1rem 0">
          <header>
            <my-presentation  title="Atos (Bull) | 2010-2018 (8 ans)"
              img="atos.png" img-height="45px" img-width="95px">
              TECHNOPOLE CHATEAU GOMBERT, 13013 Marseille
            </my-presentation>
          </header>

          <my-experience title="CPR SNCF, Développeur Java EE (Java 8) | 2015-2018 (2ans)">
            <li>Serveur d'application (Java EE) <i>WebLogic</i> | Base de données <i>Oracle 12</i></li>
            <li>JSF 2 (primeFaces, Omnifaces), CDI, Bean Validation, EJB 2 et JPA</li>
          </my-experience>

          <my-experience title="ACOSS, Intégration Technique | 2015 (10mois)">
          </my-experience>

          <my-experience title="CPR CNCF, Développeur JAVA, PSQL et OMNIS | mars. 2014 à janv. 2015 (11mois)">
          </my-experience>

          <my-experience title="DSNA, Gestionnaire de stock | aout 2013 à févr. 2014 (7mois)">
          </my-experience>

          <my-experience title="MEDDE (Ministère de l'écologie), Développeur java | janv. 2013 à juil. 2013 (7mois)">
          </my-experience>

          <my-experience title="DCNS, intégrateur clearCase | mars. 2012 à déc. 2012 (10mois)">
          </my-experience>
          <my-experience title="DCNS,  centre de services | nov. 2010 à mars. 2012 (1an 5mois)">
          </my-experience>
        </article>
      </article>

      <nord-divider style="margin: 1rem 0" />


    </nord-card>

    <nord-divider style="margin: 1rem 0" />


  </section>
</div>

<style>
  
  #competences ul li {
    margin-left: 1.4rem;
  }

  my-experience {
    display: block;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }

  article header {
    margin-bottom: 1rem;
  }

  a[href^="mailto"]::before {
    content: "📧 ";
  }

  a[href^="tel"]::before {
    content: "📞 ";
  }
</style>
