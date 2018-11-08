<?php

/**
 * @file
 * Contains friends.page.inc.
 *
 * Page callback for Best Friends entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Best Friends templates.
 *
 * Default template: friends.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_friends(array &$variables) {
  // Fetch Friends Entity Object.
  $friends = $variables['elements']['#friends'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
