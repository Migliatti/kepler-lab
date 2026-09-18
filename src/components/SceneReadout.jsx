import { buildSceneReadout } from '../utils/sceneReadout.js'

export function SceneReadout({ destination }) {
  const readout = buildSceneReadout(destination)

  return (
    <aside className="scene-readout" aria-label={`Coordenadas de ${readout.name}`} tabIndex={0}>
      <dl className="scene-readout__entries">
        {readout.entries.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="scene-readout__notice" role="note">{readout.scaleNotice}</p>
      {readout.appearanceNotice && (
        <p className="scene-readout__notice" role="note">{readout.appearanceNotice}</p>
      )}
    </aside>
  )
}
