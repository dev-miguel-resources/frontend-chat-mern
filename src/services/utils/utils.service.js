import { avatarColors } from '@services/utils/static.data';
import { floor, random } from 'lodash';

export class UtilsService {
  static avatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)];
  }

  static generateAvatar(text, backgroundColor, foregroundColor = 'white') {
    // Crear el avatar mediante Canvas
    const canvas = document.createElement('canvas');
    // Obtener el contexto en 2d del elemento canvas creado
    const context = canvas.getContext('2d');
    // Definir el ancho del elemento canvas a 200 pixeles.
    canvas.width = 200;
    // Definir el alto del elemento canvas a 200 pixeles.
    canvas.height = 200;
    // Definir el fillStyle, que es el background color
    context.fillStyle = backgroundColor;
    // Rellenar el canvas con la especificación de width y height
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Establecer la fuente del contexto para el elemento canvas
    context.font = 'normal 80px sans-serif';
    // Establecer el color de primer plano
    context.fillStyle = foregroundColor;
    // Establecer el texto alineado al centro
    context.textAlign = 'center';
    // Establecer el texto en middle property
    context.textBaseline = 'middle';
    // Combinar en el contexto el texto con el ancho y anchura
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    // Devolver este elemento canvas como imagen en formato png
    return canvas.toDataURL('image/png');
  }
}
