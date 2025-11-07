import { toast } from 'sonner'

export const notifications = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 4000
    })
  },

  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
      duration: 5000
    })
  },

  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 4000
    })
  },

  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
      duration: 4500
    })
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: Error) => string)
    }
  ) => {
    return toast.promise(promise, messages)
  },

  bilanCreated: (beneficiaryName: string) => {
    notifications.success(
      'Bilan créé avec succès',
      `Le bilan de ${beneficiaryName} a été créé et est maintenant actif.`
    )
  },

  bilanCompleted: (beneficiaryName: string) => {
    notifications.success(
      'Bilan terminé',
      `Le bilan de ${beneficiaryName} a été marqué comme terminé.`
    )
  },

  sessionScheduled: (date: string) => {
    notifications.success(
      'Séance planifiée',
      `La séance a été planifiée pour le ${date}.`
    )
  },

  messageSent: () => {
    notifications.success('Message envoyé')
  },

  documentGenerated: () => {
    notifications.success(
      'Document généré',
      'Le document de synthèse a été créé avec succès.'
    )
  },

  surveySubmitted: () => {
    notifications.success(
      'Enquête soumise',
      'Merci pour vos retours ! Votre satisfaction est importante pour nous.'
    )
  },

  dataExported: () => {
    notifications.success(
      'Données exportées',
      'Vos données ont été exportées avec succès.'
    )
  },

  settingsSaved: () => {
    notifications.success(
      'Paramètres enregistrés',
      'Vos modifications ont été enregistrées.'
    )
  },

  skillAdded: (skillName: string) => {
    notifications.success(
      'Compétence ajoutée',
      `La compétence "${skillName}" a été ajoutée à votre profil.`
    )
  },

  recommendationsGenerated: () => {
    notifications.success(
      'Recommandations générées',
      'L\'analyse IA a identifié des pistes professionnelles pertinentes pour vous.'
    )
  },

  validationError: (message: string = 'Veuillez vérifier les champs du formulaire') => {
    notifications.error('Erreur de validation', message)
  },

  networkError: () => {
    notifications.error(
      'Erreur réseau',
      'Impossible de se connecter au serveur. Vérifiez votre connexion internet.'
    )
  },

  unauthorized: () => {
    notifications.error(
      'Non autorisé',
      'Vous n\'avez pas les permissions nécessaires pour cette action.'
    )
  },

  sessionExpired: () => {
    notifications.warning(
      'Session expirée',
      'Veuillez vous reconnecter pour continuer.'
    )
  },

  unsavedChanges: () => {
    notifications.warning(
      'Modifications non enregistrées',
      'Vous avez des modifications non enregistrées. N\'oubliez pas de sauvegarder.'
    )
  },

  qualiopiCompliance: (complianceRate: number) => {
    if (complianceRate === 100) {
      notifications.success(
        'Conformité Qualiopi',
        'Tous les indicateurs Qualiopi sont conformes ✓'
      )
    } else if (complianceRate >= 80) {
      notifications.info(
        'Conformité Qualiopi',
        `Taux de conformité: ${complianceRate}% - Quelques améliorations possibles.`
      )
    } else {
      notifications.warning(
        'Attention Qualiopi',
        `Taux de conformité: ${complianceRate}% - Action requise pour maintenir la certification.`
      )
    }
  },

  cpfSubmitted: (amount: number) => {
    notifications.success(
      'Dossier CPF soumis',
      `Demande de financement de ${amount}€ soumise avec succès.`
    )
  },

  aiAnalyzing: () => {
    notifications.info(
      'Analyse en cours',
      'L\'intelligence artificielle analyse vos compétences...'
    )
  },

  copiedToClipboard: (content?: string) => {
    notifications.success(
      'Copié',
      content ? `"${content}" copié dans le presse-papier` : 'Copié dans le presse-papier'
    )
  },

  formAutoSaved: () => {
    toast('Sauvegarde automatique', {
      description: 'Vos modifications ont été sauvegardées.',
      duration: 2000
    })
  },

  reminderSent: (recipient: string) => {
    notifications.info(
      'Rappel envoyé',
      `Un rappel a été envoyé à ${recipient}.`
    )
  },

  fileUploaded: (fileName: string) => {
    notifications.success(
      'Fichier téléversé',
      `Le fichier "${fileName}" a été téléversé avec succès.`
    )
  },

  fileUploadError: (error?: string) => {
    notifications.error(
      'Erreur de téléversement',
      error || 'Impossible de téléverser le fichier. Vérifiez le format et la taille.'
    )
  },

  deleteConfirmation: (itemName: string) => {
    notifications.warning(
      'Suppression confirmée',
      `${itemName} a été supprimé définitivement.`
    )
  },

  invitationSent: (email: string) => {
    notifications.success(
      'Invitation envoyée',
      `Une invitation a été envoyée à ${email}.`
    )
  },

  connectionRestored: () => {
    notifications.success(
      'Connexion rétablie',
      'Vous êtes de nouveau en ligne.'
    )
  },

  connectionLost: () => {
    notifications.error(
      'Connexion perdue',
      'Vous êtes hors ligne. Les modifications seront synchronisées à la reconnexion.'
    )
  },

  maintenanceMode: (endTime?: string) => {
    notifications.warning(
      'Maintenance planifiée',
      endTime 
        ? `La plateforme sera en maintenance jusqu'à ${endTime}.`
        : 'La plateforme est temporairement en maintenance.'
    )
  },

  featureComingSoon: (featureName: string) => {
    notifications.info(
      'Bientôt disponible',
      `${featureName} sera disponible prochainement.`
    )
  },

  rateLimit: () => {
    notifications.warning(
      'Limite atteinte',
      'Trop de requêtes. Veuillez patienter quelques instants.'
    )
  },

  birthday: (name: string) => {
    toast('🎉 Joyeux anniversaire !', {
      description: `Toute l'équipe souhaite un joyeux anniversaire à ${name} !`,
      duration: 6000
    })
  },

  milestone: (milestone: string) => {
    toast('🎯 Objectif atteint !', {
      description: milestone,
      duration: 5000
    })
  }
}

export function showLoadingToast(message: string = 'Chargement en cours...') {
  return toast.loading(message)
}

export function dismissToast(toastId: string | number) {
  toast.dismiss(toastId)
}

export function dismissAllToasts() {
  toast.dismiss()
}
