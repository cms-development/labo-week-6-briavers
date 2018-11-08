<?php

namespace Drupal\my_best_friends;

use Drupal\Core\Entity\ContentEntityStorageInterface;
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
interface FriendsStorageInterface extends ContentEntityStorageInterface {

  /**
   * Gets a list of Best Friends revision IDs for a specific Best Friends.
   *
   * @param \Drupal\my_best_friends\Entity\FriendsInterface $entity
   *   The Best Friends entity.
   *
   * @return int[]
   *   Best Friends revision IDs (in ascending order).
   */
  public function revisionIds(FriendsInterface $entity);

  /**
   * Gets a list of revision IDs having a given user as Best Friends author.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The user entity.
   *
   * @return int[]
   *   Best Friends revision IDs (in ascending order).
   */
  public function userRevisionIds(AccountInterface $account);

  /**
   * Counts the number of revisions in the default language.
   *
   * @param \Drupal\my_best_friends\Entity\FriendsInterface $entity
   *   The Best Friends entity.
   *
   * @return int
   *   The number of revisions in the default language.
   */
  public function countDefaultLanguageRevisions(FriendsInterface $entity);

  /**
   * Unsets the language for all Best Friends with the given language.
   *
   * @param \Drupal\Core\Language\LanguageInterface $language
   *   The language object.
   */
  public function clearRevisionsLanguage(LanguageInterface $language);

}
