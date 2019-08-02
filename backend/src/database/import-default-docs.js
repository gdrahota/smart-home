import mongoose from 'mongoose'

const defaultDocs = [
  {
    collection: 'users',
    items: [
      {
        _id: '5c464965abb000da021fe582',
        firstName: 'SmartHome',
        lastName: 'Administrator',
        state: 'active',
        groups: ['GlobalAdmin'],
        accountName: 'admin',
        password: 'admin',
      }
    ]
  },
  {
    collection: 'control-definitions',
    items: [
      {
        _id: '5c629dbd6c7e3f0ebb7795c0',
        name: 'shutter',
        label: 'Rollladen',
        icon: 'fa-bars',
        endPoints: [
          {
            endPoint: 'shutter-position-set',
            label: 'Fahre an Position',
            dpt: '5.001',
            dataType: '5.001',
            controlType: 'slider',
            min: 0,
            max: 100,
            step: 10,
            defaultValue: 0,
            unit: '%'
          },
          {
            endPoint: 'shutter-position-response',
            label: 'Bestätigung',
            dpt: '5.001',
            dataType: '5.001',
            controlType: 'slider',
            min: 0,
            max: 100,
            step: 10,
            defaultValue: 0,
            unit: '%'
          },
          {
            endPoint: 'window-state-response',
            label: 'Fersterkontakt',
            dpt: '1.009',
            controlType: 'switch',
            min: false,
            max: true,
            trueLabel: 'Ab',
            falseLabel: 'Auf',
            defaultValue: false,
          }
        ]
      },
      {
        _id: '5c629dbd6c7e3f0ebb7795c1',
        name: 'lightSwitch',
        label: 'Lichtschalter',
        icon: 'fa-lightbulb-o',
        endPoints: [
          {
            endPoint: 'switch',
            label: 'Schaltbefehl',
            dpt: '1.001',
            controlType: 'switch',
            min: false,
            max: true,
            trueLabel: 'An',
            falseLabel: 'Aus',
            defaultValue: false,
          },
          {
            endPoint: 'response',
            label: 'Bestätigung',
            dpt: '1.001',
            controlType: 'readOnly',
          },
        ]
      },
      {
        _id: '5c629dbd6c7e3f0ebb7795c2',
        name: 'lightDimmer',
        label: 'Lichtdimmer',
        icon: 'fa-lightbulb-o',
        endPoints: [
          {
            endPoint: 'switch',
            label: 'Schaltbefehl',
            dpt: '1.001',
            controlType: 'switch',
            min: false,
            max: true,
            trueLabel: 'An',
            falseLabel: 'Aus',
            defaultValue: false,
          },
          {
            endPoint: 'dim',
            label: 'Dimmen',
            dpt: '5.001',
            controlType: 'slider',
            min: 0,
            max: 100,
            step: 10,
            defaultValue: 0,
            unit: '%'
          },
          {
            endPoint: 'dim-response',
            label: 'Rückmeldung',
            dpt: '5.001',
            controlType: 'readOnly',
          },
        ]
      },
      {
        _id: '5c629dbd6c7e3f0ebb7795c3',
        name: 'rtc',
        label: 'Heizungssteuerung',
        icon: 'fa-thermometer-half',
        endPoints: [
          {
            endPoint: 'temp-current-value',
            label: 'Ist-Temperatur',
            dtp: '9.001',
            controlType: 'readOnly',
          },
          {
            endPoint: 'temp-target-value',
            label: 'Soll-Temperatur',
            dtp: '9.001',
            controlType: 'slider',
            min: 10,
            max: 23,
            step: 0.5,
            defaultValue: 20,
            unit: '°C'
          },
          {
            endPoint: 'switch-response',
            label: 'Bestätigung (Ein/Aus)',
            dtp: '1.009',
            controlType: 'readOnly',
          },
          {
            endPoint: 'pusher-response',
            label: 'Bestätigung (0..100 %)',
            dtp: '5.001',
            controlType: 'readOnly',
          },
        ]
      },
      {
        _id: '5c629dbd6c7e3f0ebb7795c4',
        name: '14CharTextDisplay',
        label: '14 Zeichen-Anzeige',
        icon: 'fa-text-width',
        endPoints: [
          {
            endPoint: 'set-text',
            label: 'Text senden',
            dtp: '16.000',
            controlType: 'text-field',
          },
        ]
      },
      {
        _id: '5c629dbd6c7e3f0ebb7795c5',
        name: 'dayNightSwitch',
        label: 'Tag-/Nachtumschaltung',
        icon: 'fa-toggle-on',
        endPoints: [
          {
            endPoint: 'set-day',
            label: 'Jetzt ist Tag',
            dtp: '1.001',
            controlType: 'switch',
            min: false,
            max: true,
          },
          {
            endPoint: 'set-night',
            label: 'Jetzt ist Nacht',
            dtp: '1.001',
            controlType: 'switch',
            min: false,
            max: true,
          },
        ]
      },
    ]
  }
]

export const loadDefaultDocs = () => {

  defaultDocs.forEach(entity => {
    const model = mongoose.model(entity.collection)

    entity.items.forEach(async item => {
      try {
        await new model(item).save()
      } catch (e) {
        if (e.code !== 11000) {
          console.log(e)
        }
      }
    })
  })
}
