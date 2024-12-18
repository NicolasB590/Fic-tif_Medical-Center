const ConditionOfUse = () => {
  return (
    <div className="mx-2 flex flex-col items-start justify-start gap-4 text-balance rounded-xl bg-base-300 p-2 text-start">
      <h2 className="text-2xl font-semibold text-secondary">1. Introduction</h2>
      <p>
        Nous nous engageons à protéger la vie privée de nos utilisateurs. Cette
        politique décrit comment nous collectons, utilisons, stockons et
        protégeons vos données personnelles, conformément au Règlement Général
        sur la Protection des Données (RGPD).
      </p>

      <h2 className="text-2xl font-semibold text-secondary">
        2. Types de Données Collectées
      </h2>
      <p>Nous collectons les types de données suivantes :</p>
      <ul>
        <li>
          <span className="font-semibold">Identité :</span> prénom, nom, genre,
          date de naissance.
        </li>
        <li>
          <span className="font-semibold">Coordonnées :</span> adresse, numéro
          de téléphone, adresse e-mail.
        </li>
        <li>
          <span className="font-semibold">Informations de connexion :</span> mot
          de passe.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-secondary">
        3. Finalités de la Collecte des Données
      </h2>
      <p>
        Vos données personnelles peuvent être utilisées pour les finalités
        suivantes :
      </p>
      <ul>
        <li>Gérer votre compte utilisateur.</li>
        <li>Vous fournir un accès à nos services.</li>
        <li>Améliorer notre plateforme et nos services.</li>
        <li>
          Communiquer avec vous, notamment pour des mises à jour et des
          informations concernant votre compte.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-secondary">
        4. Base Légale du Traitement
      </h2>
      <p>
        Nous traitons vos données personnelles sur la base des conditions
        suivantes :
      </p>
      <ul>
        <li>
          <span className="font-semibold">Consentement :</span> Vous avez
          consenti au traitement de vos données pour une ou plusieurs finalités
          spécifiques.
        </li>
        <li>
          <span className="font-semibold">Exécution d&apos;un contrat :</span>
          Le traitement est nécessaire à l&apos;exécution d&apos;un contrat
          auquel vous êtes partie.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-secondary">
        5. Durée de Conservation des Données
      </h2>
      <p>
        Nous conserverons vos données personnelles aussi longtemps que
        nécessaire pour atteindre les finalités pour lesquelles elles ont été
        collectées, conformément à nos obligations légales.
      </p>

      <h2 className="text-2xl font-semibold text-secondary">6. Vos Droits</h2>
      <p>
        Conformément au RGPD, vous avez les droits suivants concernant vos
        données personnelles :
      </p>
      <ul>
        <li>
          <span className="font-semibold">Droit d&apos;accès :</span> Vous
          pouvez demander l&apos;accès à vos données personnelles que nous
          détenons.
        </li>
        <li>
          <span className="font-semibold">Droit de rectification :</span> Vous
          pouvez demander la correction de vos données personnelles inexactes.
        </li>
        <li>
          <span className="font-semibold">Droit à l&apos;effacement :</span>
          Vous pouvez demander la suppression de vos données personnelles.
        </li>
        <li>
          <span className="font-semibold">Droit de restriction :</span> Vous
          pouvez demander la limitation du traitement de vos données.
        </li>
        <li>
          <span className="font-semibold">Droit à la portabilité :</span> Vous
          pouvez demander de recevoir vos données dans un format structuré et
          couramment utilisé.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-secondary">
        7. Sécurité des Données
      </h2>
      <p>
        Nous mettons en place des mesures de sécurité appropriées pour protéger
        vos données personnelles contre la perte, l&apos;utilisation abusive ou
        l&apos;accès non autorisé.
      </p>

      <h2 className="text-2xl font-semibold text-secondary">
        8. Partage des Données
      </h2>
      <p>
        Nous ne vendons pas vos données personnelles. Vos données peuvent être
        partagées avec des tiers uniquement si cela est nécessaire pour fournir
        nos services ou si la loi l&apos;exige.
      </p>

      <h2 className="text-2xl font-semibold text-secondary">
        9. Modification des Conditions
      </h2>
      <p>
        Nous nous réservons le droit de modifier ces conditions
        d&apos;utilisation. Nous vous informerons de tout changement substantiel
        et vous donnerons la possibilité d&apos;accepter ces changements.
      </p>

      <h2 className="text-2xl font-semibold text-secondary">10. Contact</h2>
      <p>
        Pour toute question concernant nos conditions d&apos;utilisation ou vos
        droits concernant vos données personnelles, veuillez nous contacter à
        l&apos;adresse suivante :{" "}
        <a href="mailto:administrateur@fictif.com">administrateur@fictif.com</a>
        .
      </p>
    </div>
  );
};
export default ConditionOfUse;
