/**
 * Генерирует массив CSS-классов на основе переданных модификаторов,
 * используя соглашение об именовании по типу БЭМ: `block--mod`.
 *
 * Функция работает с CSS-модулями в React/Next.js и безопасно обрабатывает:
 * - отсутствующие модификаторы (`null`, `undefined`, пустая строка),
 * - несуществующие классы в CSS-модуле (игнорирует их),
 * - как одиночные модификаторы (`string`), так и список (`string[]`).
 *
 * @example
 * // В компоненте с CSS-модулем
 * const modClasses = getMod(styles, 'sidebar', 'left');
 * // → ['sidebar--left'] (если класс определён в styles)
 *
 * @example
 * getMod(styles, 'button', ['primary', 'large', 'rounded']);
 * // → ['button--primary', 'button--large', 'button--rounded'] (только существующие)
 *
 * @example
 * getMod(styles, 'card', undefined);
 * // → []
 *
 * @param styles - Объект стилей, импортированный из CSS-модуля (например,
 * `import styles from './Block.module.css'`)
 * @param block - Базовое имя блока (например, 'sidebar', 'button', 'card')
 * @param mods - Один модификатор (`string`) или массив модификаторов (`string[]`),
 * может быть `undefined` или `null`
 * @returns Массив строк — валидных CSS-классов из модуля.
 * Если модификатор отсутствует или не найден, возвращается пустой массив.
 *
 * @see https://ru.bem.info/methodology/naming-convention/
 */
export function getMod(
  styles: Record<string, string>,
  block: string,
  mods?: string | string[]
): string[] {
  const modList = !mods ? [] : typeof mods === 'string' ? [mods] : mods;

  return modList
    .filter(Boolean)
    .map((mod) => styles[`${block}--${mod}`])
    .filter(Boolean) as string[];
}
