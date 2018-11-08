<?php

namespace Drupal\my_best_friends\Controller;

use Drupal\Component\Utility\Xss;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Url;
use Drupal\my_best_friends\Entity\FriendsInterface;

/**
 * Class FriendsController.
 *
 *  Returns responses for Best Friends routes.
 */
class FriendsController extends ControllerBase implements ContainerInjectionInterface {

  /**
   * Displays a Best Friends  revision.
   *
   * @param int $friends_revision
   *   The Best Friends  revision ID.
   *
   * @return array
   *   An array suitable for drupal_render().
   */
  public function revisionShow($friends_revision) {
    $friends = $this->entityManager()->getStorage('friends')->loadRevision($friends_revision);
    $view_builder = $this->entityManager()->getViewBuilder('friends');

    return $view_builder->view($friends);
  }

  /**
   * Page title callback for a Best Friends  revision.
   *
   * @param int $friends_revision
   *   The Best Friends  revision ID.
   *
   * @return string
   *   The page title.
   */
  public function revisionPageTitle($friends_revision) {
    $friends = $this->entityManager()->getStorage('friends')->loadRevision($friends_revision);
    return $this->t('Revision of %title from %date', ['%title' => $friends->label(), '%date' => format_date($friends->getRevisionCreationTime())]);
  }

  /**
   * Generates an overview table of older revisions of a Best Friends .
   *
   * @param \Drupal\my_best_friends\Entity\FriendsInterface $friends
   *   A Best Friends  object.
   *
   * @return array
   *   An array as expected by drupal_render().
   */
  public function revisionOverview(FriendsInterface $friends) {
    $account = $this->currentUser();
    $langcode = $friends->language()->getId();
    $langname = $friends->language()->getName();
    $languages = $friends->getTranslationLanguages();
    $has_translations = (count($languages) > 1);
    $friends_storage = $this->entityManager()->getStorage('friends');

    $build['#title'] = $has_translations ? $this->t('@langname revisions for %title', ['@langname' => $langname, '%title' => $friends->label()]) : $this->t('Revisions for %title', ['%title' => $friends->label()]);
    $header = [$this->t('Revision'), $this->t('Operations')];

    $revert_permission = (($account->hasPermission("revert all best friends revisions") || $account->hasPermission('administer best friends entities')));
    $delete_permission = (($account->hasPermission("delete all best friends revisions") || $account->hasPermission('administer best friends entities')));

    $rows = [];

    $vids = $friends_storage->revisionIds($friends);

    $latest_revision = TRUE;

    foreach (array_reverse($vids) as $vid) {
      /** @var \Drupal\my_best_friends\FriendsInterface $revision */
      $revision = $friends_storage->loadRevision($vid);
      // Only show revisions that are affected by the language that is being
      // displayed.
      if ($revision->hasTranslation($langcode) && $revision->getTranslation($langcode)->isRevisionTranslationAffected()) {
        $username = [
          '#theme' => 'username',
          '#account' => $revision->getRevisionUser(),
        ];

        // Use revision link to link to revisions that are not active.
        $date = \Drupal::service('date.formatter')->format($revision->getRevisionCreationTime(), 'short');
        if ($vid != $friends->getRevisionId()) {
          $link = $this->l($date, new Url('entity.friends.revision', ['friends' => $friends->id(), 'friends_revision' => $vid]));
        }
        else {
          $link = $friends->link($date);
        }

        $row = [];
        $column = [
          'data' => [
            '#type' => 'inline_template',
            '#template' => '{% trans %}{{ date }} by {{ username }}{% endtrans %}{% if message %}<p class="revision-log">{{ message }}</p>{% endif %}',
            '#context' => [
              'date' => $link,
              'username' => \Drupal::service('renderer')->renderPlain($username),
              'message' => ['#markup' => $revision->getRevisionLogMessage(), '#allowed_tags' => Xss::getHtmlTagList()],
            ],
          ],
        ];
        $row[] = $column;

        if ($latest_revision) {
          $row[] = [
            'data' => [
              '#prefix' => '<em>',
              '#markup' => $this->t('Current revision'),
              '#suffix' => '</em>',
            ],
          ];
          foreach ($row as &$current) {
            $current['class'] = ['revision-current'];
          }
          $latest_revision = FALSE;
        }
        else {
          $links = [];
          if ($revert_permission) {
            $links['revert'] = [
              'title' => $this->t('Revert'),
              'url' => $has_translations ?
              Url::fromRoute('entity.friends.translation_revert', ['friends' => $friends->id(), 'friends_revision' => $vid, 'langcode' => $langcode]) :
              Url::fromRoute('entity.friends.revision_revert', ['friends' => $friends->id(), 'friends_revision' => $vid]),
            ];
          }

          if ($delete_permission) {
            $links['delete'] = [
              'title' => $this->t('Delete'),
              'url' => Url::fromRoute('entity.friends.revision_delete', ['friends' => $friends->id(), 'friends_revision' => $vid]),
            ];
          }

          $row[] = [
            'data' => [
              '#type' => 'operations',
              '#links' => $links,
            ],
          ];
        }

        $rows[] = $row;
      }
    }

    $build['friends_revisions_table'] = [
      '#theme' => 'table',
      '#rows' => $rows,
      '#header' => $header,
    ];

    return $build;
  }

}
