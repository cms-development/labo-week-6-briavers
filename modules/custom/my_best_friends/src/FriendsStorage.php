<?php

namespace Drupal\my_best_friends;

use Drupal\Core\Entity\Sql\SqlContentEntityStorage;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Language\LanguageInterface;
use Drupal\my_best_friends\Entity\FriendsInterface;

/**
 * Defines the storage handler class for Best Friends entities.
 *
 * This extends the base storage class, adding required special handling for
 * Best Friends entities.
 *
 * @ingroup my_best_friends
 */
class FriendsStorage extends SqlContentEntityStorage implements FriendsStorageInterface {

  /**
   * {@inheritdoc}
   */
  public function revisionIds(FriendsInterface $entity) {
    return $this->database->query(
      'SELECT vid FROM {friends_revision} WHERE id=:id ORDER BY vid',
      [':id' => $entity->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function userRevisionIds(AccountInterface $account) {
    return $this->database->query(
      'SELECT vid FROM {friends_field_revision} WHERE uid = :uid ORDER BY vid',
      [':uid' => $account->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function countDefaultLanguageRevisions(FriendsInterface $entity) {
    return $this->database->query('SELECT COUNT(*) FROM {friends_field_revision} WHERE id = :id AND default_langcode = 1', [':id' => $entity->id()])
      ->fetchField();
  }

  /**
   * {@inheritdoc}
   */
  public function clearRevisionsLanguage(LanguageInterface $language) {
    return $this->database->update('friends_revision')
      ->fields(['langcode' => LanguageInterface::LANGCODE_NOT_SPECIFIED])
      ->condition('langcode', $language->getId())
      ->execute();
  }

}
