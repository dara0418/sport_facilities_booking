(function() {
  'use strict';

  angular.module('app.components.i18n')

  .config(frenchPack);

  function frenchPack($translateProvider) {
    $translateProvider.translations('fr', {
      SUCCESS: 'Succès',
      ERROR: 'Erreur',
      INFO: 'Information',

      NAME: 'Nom',
      DOB: 'Date de Naissance',
      EMAIL: 'Email',
      PHONE: 'Téléphone',
      CELLPHONE: 'Cellulaire',
      PASSWORD: 'Mot de Passe',
      RE_ENTER: 'Réintégrer',
      REGISTER: 'Enregistrer',
      LOGIN: 'S\'identifier',
      UPDATE: 'Mettre à jour',
      NEW: 'Nouveau',
      OLD: 'Vieux',
      CONFIRM: 'Confirmer',
      CHANGE: 'Changer',
      RESET: 'Remettre',
      URL: 'URL',
      PRIMARY_PHONE: 'Numéro de Téléphone Principal',
      SECONDARY_PHONE: 'Numéro de Téléphone Secondaire',
      FAX_NUMBER: 'Numéro de Fax',
      CONTENT: 'Content',
      REMOVE_MEMBER: 'Retirer Membre',
      CHANGE_ROLE: 'Changement Rôle',
      RATE: 'Taux',
      CURRENCY: 'Monnaie',

      TITLE: 'Titre',
      MR: 'M',
      MRS: 'MME',
      MS: 'MLLE',

      GENDER: 'Sexe',
      MALE: 'Mâle',
      FEMALE: 'Femelle',

      STATUS: 'Statut',
      ACTIVE: 'Actif',
      INACTIVE: 'Inactif',

      ROLE: 'Rôle',
      ADMIN: 'Administrateur',
      PROFESSOR: 'Professeur',
      MEMBER: 'Membre',

      SPORT_TYPE: 'Type de Sport',
      TENNIS: 'Tennis',
      PING_PONG: 'Ping-Pong',
      PADDLE: 'Pagaie',
      BADMINTON: 'Badminton',
      SQUASH: 'Squash',
      FOOTBALL_5: 'Football-5',

      TIME_UNIT: 'Unité de Temps',
      MINUTE: 'Minute',
      HOUR: 'Heure',
      DAY: 'Jour',
      MONTH: 'Mois',
      YEAR: 'Année',

      EMPTY_FIELD: 'Vous ne pouvez pas laisser ce champ vide',
      REGISTER_SUCCESS: 'Vous avez enregistré',
      UNEXPECTED_ERROR: 'Nous sommes désolés mais certaines erreurs se sont produites',
      SAVE_SUCCESS: 'Sauver succès',
      UPDATE_SUCCESS: 'Mise à jour réussie',
      DELETE_SUCCESS: 'Supprimer succès',
      CANT_BE_EMPTY: 'ne peut pas être vide',
      PASSWORD_CHANGED: 'Mot de passe a changé',
      INVITE_PEOPLE: 'Inviter les gens',
      MEMBERSHIP_REQUEST_SENT: 'Demande d\'adhésion a été envoyé',
      INTERNAL_ERROR: 'Nous sommes désolés mais il ya une erreur',
      MEMBER_NOT_FOUND: 'Impossible de trouver le membre ayant email',
      IS_ALREADY_MEMBER: 'Cet utilisateur est déjà membre du club',
      QUIT_CLUB_SUCCESS: 'Arrêter de succès du club'
    });
  }
})();
