export const facilityData = [
  {
    _id: 1,
    address: {
      city: 'Berlin',
      postCode: '12621',
      street: 'Dorfstr. 16'
    },
    attributes: [
      {
        _id: 1,
        name: 'Etage',
        instances: [
          { _id: 1, name: 'EG' },
          { _id: 2, name: 'OG' },
          { _id: 3, name: 'DG' }
        ]
      },
      {
        _id: 2,
        name: 'Raum',
        instances: [
          { _id: 1, name: 'Wohnzimmer' },
          { _id: 2, name: 'Esszimmer' },
          { _id: 3, name: 'Küche' },
          { _id: 4, name: 'Flur, vorne' },
          { _id: 5, name: 'Flur, hinten' },
          { _id: 6, name: 'Elektro' },
          { _id: 7, name: 'WC' },
          { _id: 8, name: 'Bad' },
          { _id: 9, name: 'Franka' },
          { _id: 10, name: 'Frederik' },
          { _id: 11, name: 'Guido' },
          { _id: 12, name: 'Gäste' },
          { _id: 13, name: 'Ankleide' },
          { _id: 14, name: 'Zentrale' }
        ]
      },
      {
        _id: 3,
        name: 'Ausrichtung',
        instances: [
          { _id: 1, name: 'vorne' },
          { _id: 2, name: 'seitlich' },
          { _id: 3, name: 'hinten' },
          { _id: 4, name: 'vorne' },
        ]
      }
    ]
  }
]
