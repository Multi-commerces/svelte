<script>
  import "/src/lib/webcomponents/app-skeleton.js";
  let nom ="julien ilari";
</script>

<nord-card>
  <h2 slot="header">Fake page</h2>
  <p>
    Cette page sert de point d'entrée pour vérifier le rendu des composants.
    Celle-ci peut également servire d'exemple pour le développement des autres pages.
  </p>
  <form>
    <nord-input id="name" type="texte" name="nom" size="s" aria-valuetext={nom}>
      <span slot="label">test</span>
      
      <span slot="end">saisir le nom</span>
      <span slot="error">erreur sur le champ</span>
    </nord-input>

    <nord-input id="name2" type="texte" name="nom" size="s" aria-valuetext={nom}>
      <span slot="label">test</span>
      
      <span slot="end">saisir le nom</span>
      <span slot="error">erreur sur le champ</span>
    </nord-input>
    <nord-button type="submit">Envoyer</nord-button>
    <nord-button type="reset">Annuler</nord-button>
  </form>
 
</nord-card>
